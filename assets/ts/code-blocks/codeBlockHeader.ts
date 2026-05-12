// codeBlockHeader.ts
// Builds and inserts the header bar for each code block:
//   Left side  — language badge + line count
//   Right side — copy button

import { getDisplayLang } from './codeBlockLang';
import { extractCode }    from './codeBlockUtils';

export function buildHeader(highlight: Element, rawLang: string, lineCount: number): void {
  const displayLang = rawLang ? getDisplayLang(rawLang) : '';

  const header = document.createElement('div');
  header.classList.add('code-block-header');

  // ── Left: badge + line count ──────────────────────────────────────────────
  const headerLeft = document.createElement('div');
  headerLeft.classList.add('code-block-header-left');

  if (displayLang) {
    const badge = document.createElement('span');
    badge.classList.add('code-block-lang');
    badge.textContent = displayLang;
    headerLeft.appendChild(badge);
  }

  if (lineCount > 0) {
    const lineLabel = document.createElement('span');
    lineLabel.classList.add('code-block-lines');
    lineLabel.textContent = `${lineCount} lines`;
    headerLeft.appendChild(lineLabel);
  }

  header.appendChild(headerLeft);

  // ── Right: copy button ────────────────────────────────────────────────────
  const copyButton = document.createElement('button');
  copyButton.classList.add('code-block-copy');
  copyButton.setAttribute('aria-label', 'Copy code');
  copyButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </svg>
    <span>Copy</span>
  `;
  header.appendChild(copyButton);

  copyButton.addEventListener('click', () => {
    const code = extractCode(highlight);
    navigator.clipboard.writeText(code).then(() => {
      copyButton.classList.add('copied');
      copyButton.querySelector('span')!.textContent = 'Copied!';
      setTimeout(() => {
        copyButton.classList.remove('copied');
        copyButton.querySelector('span')!.textContent = 'Copy';
      }, 2000);
    });
  });

  highlight.insertBefore(header, highlight.firstChild);
}
