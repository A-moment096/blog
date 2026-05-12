// codeBlockUtils.ts
// Shared utilities: line counting and code text extraction.
// These are language-agnostic — console-specific extraction logic lives in
// codeBlockConsole.ts and is called from here via the data-lang check.

// Count the number of lines in a highlight block, handling both plain and
// linenos=table Chroma output modes.
export function countLines(highlight: Element): number {
  const codeEl = highlight.querySelector('code[data-lang]');
  if (!codeEl) return 0;

  // linenos=table mode: lines live in the second <td>
  const lntable = highlight.querySelector('table.lntable');
  if (lntable) {
    const codeTd = lntable.querySelectorAll('td.lntd')[1];
    if (codeTd) {
      return codeTd.querySelectorAll('span.line, span[style*="display:flex"]').length
        || codeTd.textContent!.split('\n').filter(l => l.trim() !== '').length;
    }
  }

  // Default: each <span style="display:flex"> wraps one line
  const lineSpans = codeEl.querySelectorAll('span[style*="display:flex"]');
  if (lineSpans.length > 0) return lineSpans.length;

  // Fallback: count non-empty newlines in raw text content
  return (codeEl.textContent || '').split('\n').filter((l, i, arr) =>
    !(i === arr.length - 1 && l.trim() === '')
  ).length;
}

// Extract the copyable text from a highlight block.
// Console blocks: only command lines are copied, with prompts stripped.
//   (Relies on fixConsoleBlock having already run so .gp spans are correct.)
// Regular blocks: full code text, excluding line number columns.
export function extractCode(highlight: Element): string {
  const codeBlock = highlight.querySelector('code[data-lang]');
  if (!codeBlock) return '';

  // ── Console blocks ──────────────────────────────────────────────────────────
  // Command lines have a .gp span (the prompt, already absorbed trailing space)
  // followed by sibling nodes with the command text. Output lines use .go only.
  // We collect command text only — output lines are skipped entirely.
  if (codeBlock.getAttribute('data-lang') === 'console') {
    const commands: string[] = [];
    codeBlock.querySelectorAll('.line').forEach(lineEl => {
      const cl = lineEl.querySelector('.cl');
      if (!cl) return;
      const gp = cl.querySelector('.gp');
      if (!gp) return; // output / blank line — skip
      // Gather all sibling nodes after .gp; the leading space has been
      // absorbed into the .gp span so cmd starts with the first command char.
      let cmd = '';
      let node = gp.nextSibling;
      while (node) {
        cmd += node.textContent ?? '';
        node = node.nextSibling;
      }
      commands.push(cmd.trimEnd());
    });
    return commands.join('\n');
  }

  // ── Regular blocks ──────────────────────────────────────────────────────────
  // linenos=table: skip the line-number column, grab only the code column
  const lntable = highlight.querySelector('table.lntable');
  if (lntable) {
    const codeTd = lntable.querySelectorAll('td.lntd')[1];
    if (codeTd) {
      const lines = codeTd.querySelectorAll('.line .cl, span[style*="display:flex"] > span');
      if (lines.length > 0) {
        return Array.from(lines).map(l => l.textContent || '').join('');
      }
      return codeTd.textContent || '';
    }
  }

  // Default (no line numbers): grab .cl spans, or fall back to raw text
  const clSpans = codeBlock.querySelectorAll('.line .cl');
  if (clSpans.length > 0) {
    return Array.from(clSpans).map(s => s.textContent || '').join('');
  }

  return codeBlock.textContent || '';
}
