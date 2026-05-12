// codeBlock.ts
// Entry point. Import and call setupCodeBlocks() from main.ts.
//
// Module responsibilities:
//   codeBlockLang.ts    — language label map and display name resolver
//   codeBlockUtils.ts   — countLines, extractCode
//   codeBlockConsole.ts — fixConsoleBlock, annotateConsoleBlock
//   codeBlockHeader.ts  — header bar (badge + line count + copy button)
//   codeBlockCollapse.ts — collapse/expand wrapper

import { countLines }           from './codeBlockUtils';
import { fixConsoleBlock,
         annotateConsoleBlock } from './codeBlockConsole';
import { buildHeader }          from './codeBlockHeader';
import { buildCollapse }        from './codeBlockCollapse';

export function setupCodeBlocks(): void {
  const highlights = document.querySelectorAll('.article-content div.highlight');

  highlights.forEach(highlight => {
    const codeEl  = highlight.querySelector('code[data-lang]');
    const rawLang = codeEl?.getAttribute('data-lang') ?? '';

    // Console blocks need token fixes before anything else reads the DOM
    if (rawLang === 'console') {
      fixConsoleBlock(highlight);
      annotateConsoleBlock(highlight);
    }

    const lineCount = countLines(highlight);

    buildHeader(highlight, rawLang, lineCount);
    buildCollapse(highlight, lineCount);
  });
}
