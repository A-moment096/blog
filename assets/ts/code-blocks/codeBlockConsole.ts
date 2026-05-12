// codeBlockConsole.ts
// Post-processes Hugo/Chroma console blocks to fix misclassified tokens and
// annotate command lines with sequential numbers and non-copyable prompts.
//
// Why post-processing is needed:
//   Chroma's console lexer makes several systematic errors:
//
//   .go (GenericOutput)  — used for plain output BUT ALSO for unrecognised
//                          prompts like "PS C:\...>" and "(.venv) %"
//   .err (Error)         — used for blank lines (a Chroma quirk)
//   .gp (GenericPrompt)  — used for prompt-like chars ($, %, >, #) even when
//                          they are NOT prompts (e.g. "####" progress bars).
//
// The universal rule to distinguish a real prompt from output that happens to
// start with a prompt-like character:
//
//   Real prompt  →  <prompt_chars> <SPACE> <command>
//   Not a prompt →  <prompt_chars><no space><more chars>
//
// For Chroma-native .gp spans the space lives in the sibling text node, so we
// inspect firstSpan.nextSibling.textContent. For .go-tagged PS/venv lines the
// whole line is one span and we use a regex that captures the trailing space.

// Matches PowerShell prompts: "PS> " or "PS C:\path\to> "
const PS_PROMPT = /^PS[^>]*>\s/;

// Matches ">> " continuation lines: Chroma emits .gp=">" with sibling "> cmd"
const PS_CONTINUATION = /^>\s/;

// Matches venv-prefixed prompts: "(.venv) % ", "(.env) $ ", etc.
const VENV_PROMPT = /^\([^)]+\)\s*[%$#]\s/;

// ── Internal helpers ──────────────────────────────────────────────────────────

// Replace all children of `cl` with a single .go output span.
function mergeAsOutput(cl: Element): void {
  const lineText = cl.textContent ?? '';
  while (cl.firstChild) cl.removeChild(cl.firstChild);
  const span = document.createElement('span');
  span.classList.add('go');
  span.textContent = lineText;
  cl.appendChild(span);
}

// Convert a .go-tagged span into a .gp prompt span and append a sibling for
// the command text. The prompt regex MUST capture the trailing space so that
// `rest` starts cleanly with the first command character.
function splitPrompt(cl: Element, firstSpan: Element, promptPart: string, rest: string): void {
  firstSpan.classList.remove('go');
  firstSpan.classList.add('gp');
  firstSpan.textContent = promptPart; // includes trailing space
  if (rest) {
    const restSpan = document.createElement('span');
    restSpan.textContent = rest;
    firstSpan.insertAdjacentElement('afterend', restSpan);
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

// Fix misclassified tokens in a console code block.
// Must run before annotateConsoleBlock so that .gp spans are reliable.
export function fixConsoleBlock(highlight: Element): void {
  const codeEl = highlight.querySelector('code[data-lang="console"]');
  if (!codeEl) return;

  codeEl.querySelectorAll('.line').forEach(lineEl => {
    const cl = lineEl.querySelector('.cl');
    if (!cl) return;

    const firstSpan = cl.querySelector('span');
    if (!firstSpan) return;

    const text = cl.textContent ?? '';

    // ── 1. Blank lines tagged as .err ──────────────────────────────────────────
    // Chroma emits <span class="err">\n</span> for empty console lines.
    if (firstSpan.classList.contains('err') && text.trim() === '') {
      firstSpan.classList.remove('err');
      return;
    }

    // ── 2. Chroma-native .gp spans ─────────────────────────────────────────────
    // Chroma puts the prompt character(s) in a .gp span and the rest of the
    // line (starting with a space) in a sibling text node.
    if (firstSpan.classList.contains('gp')) {
      const nextSibling = firstSpan.nextSibling;
      const nextText = nextSibling?.textContent ?? '';

      // 2a. ">>" PowerShell/shell continuation line.
      //     Chroma emits .gp=">" with sibling "> command" (second > + space).
      //     We absorb both ">" chars and the space into .gp, leaving only the
      //     command text in the sibling.
      if (firstSpan.textContent === '>' && PS_CONTINUATION.test(nextText)) {
        firstSpan.textContent = '>> ';
        if (nextSibling) nextSibling.textContent = nextText.slice(2);
        return;
      }

      // 2b. No space after prompt chars → not a real prompt (e.g. "####...")
      //     Merge the whole line into a .go output span.
      if (!nextText.startsWith(' ')) {
        mergeAsOutput(cl);
        return;
      }

      // 2c. Genuine prompt. Absorb the leading space from the sibling into the
      //     .gp span so that user-select:none also covers that space, and the
      //     command text sibling starts cleanly with the first command character.
      firstSpan.textContent = (firstSpan.textContent ?? '') + ' ';
      if (nextSibling) nextSibling.textContent = nextText.slice(1);
      return;
    }

    // ── 3. PowerShell prompt lines tagged as .go ───────────────────────────────
    // Chroma does not recognise "PS C:\Users\foo> " so the whole line lands in
    // a single .go span. The regex captures the trailing space so `rest` is clean.
    if (firstSpan.classList.contains('go') && PS_PROMPT.test(text)) {
      const match = text.match(/^(PS[^>]*>\s)([\s\S]*)$/);
      if (match) splitPrompt(cl, firstSpan, match[1], match[2]);
      return;
    }

    // ── 4. Venv-prefixed prompt lines tagged as .go ────────────────────────────
    // e.g. "(.venv) % pip install ..." — the venv prefix confuses Chroma.
    if (firstSpan.classList.contains('go') && VENV_PROMPT.test(text)) {
      const match = text.match(/^(\([^)]+\)\s*[%$#]\s)([\s\S]*)$/);
      if (match) splitPrompt(cl, firstSpan, match[1], match[2]);
      return;
    }
  });
}

// Annotate a console block after fixConsoleBlock has run:
//   - Command/continuation lines (.gp present):
//       • Add .console-prompt to the .gp span → user-select:none in CSS
//       • Assign a sequential command index in the line-number column
//   - Output / blank lines:
//       • Inject a phantom number with opacity:0 — same digits as the widest
//         command number so the column width is identical on every line
//
// Two passes:
//   Pass 1 — count command lines to determine the widest number string
//   Pass 2 — assign real numbers to commands, phantom numbers to output lines
export function annotateConsoleBlock(highlight: Element): void {
  const codeEl = highlight.querySelector('code[data-lang="console"]');
  if (!codeEl) return;

  const linenos = !!highlight.querySelector('.ln, .lnt'); // Hugo linenos enabled?

  // Pass 1: count command lines so we know the widest index string.
  // All number spans — both real and phantom — use this width so every line's
  // code column starts at the same horizontal position.
  const lines = Array.from(codeEl.querySelectorAll('.line'));
  const totalCmds = lines.filter(lineEl => lineEl.querySelector('.cl .gp')).length;
  const width = String(totalCmds).length; // digit count of the widest number

  // Pad a number string with leading spaces to `width` characters.
  // Combined with text-align:right on .console-ln this reproduces the same
  // right-aligned gutter that Chroma uses for its own .ln spans.
  const fmt = (n: number): string => String(n).padStart(width, ' ');

  // The phantom string is the widest number rendered invisibly on output lines.
  const phantom = fmt(totalCmds);

  // Pass 2: annotate
  let cmdIndex = 1;

  lines.forEach(lineEl => {
    const cl = lineEl.querySelector('.cl');
    if (!cl) return;

    const gp = cl.querySelector('.gp');
    const ln = lineEl.querySelector('.ln, .lnt');

    if (gp) {
      // ── Command / continuation line ─────────────────────────────────────────
      gp.classList.add('console-prompt');

      if (ln) {
        ln.textContent = fmt(cmdIndex);
        (ln as HTMLElement).style.opacity = '';
      } else if (!linenos) {
        const numSpan = document.createElement('span');
        numSpan.classList.add('ln', 'console-ln');
        numSpan.textContent = fmt(cmdIndex);
        lineEl.insertBefore(numSpan, cl);
      }
      cmdIndex++;
    } else {
      // ── Output / blank line ─────────────────────────────────────────────────
      // Phantom: same digit count as the widest command number, but invisible.
      // This keeps the code column perfectly aligned regardless of digit count.
      if (ln) {
        ln.textContent = phantom;
        (ln as HTMLElement).style.opacity = '0';
      } else if (!linenos) {
        const numSpan = document.createElement('span');
        numSpan.classList.add('ln', 'console-ln');
        numSpan.textContent = phantom;
        numSpan.style.opacity = '0';
        lineEl.insertBefore(numSpan, cl);
      }
    }
  });
}