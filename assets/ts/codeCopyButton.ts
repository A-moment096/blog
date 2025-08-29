// 独立的代码复制按钮逻辑
export function setupCopyButtons() {
  const highlights = document.querySelectorAll('.article-content div.highlight');

  highlights.forEach(highlight => {
    const copyButton = document.createElement('button');
    copyButton.innerHTML = 'Copy';
    copyButton.classList.add('copyCodeButton');
    highlight.appendChild(copyButton);

    const codeBlock = highlight.querySelector('code[data-lang]');
    const consoleBlock = highlight.classList.contains('console-block');

    copyButton.addEventListener('click', () => {
      let finalCode = '';

      if (consoleBlock) {
        const hidden = highlight.querySelector('textarea.copy-target') as HTMLTextAreaElement | null;
        if (hidden) {
          finalCode = hidden.value;
        }
      } else if (codeBlock) {
        const lines = codeBlock.querySelectorAll('.line .cl');
        const lineTexts: string[] = [];
        for (let i = 0; i < lines.length; i++) {
          lineTexts.push(lines[i].textContent || '');
        }
        finalCode = lineTexts.join('');
      }

      navigator.clipboard.writeText(finalCode).then(() => {
        copyButton.textContent = 'Copied!';
        setTimeout(() => (copyButton.textContent = 'Copy'), 1000);
      });
    });
  });
}
