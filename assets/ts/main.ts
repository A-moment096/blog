/*!
*   Hugo Theme Stack
*
*   @author: Jimmy Cai
*   @website: https://jimmycai.com
*   @link: https://github.com/CaiJimmy/hugo-theme-stack
*/
import StackGallery from "ts/gallery";
import { getColor } from 'ts/color';
import menu from 'ts/menu';
import createElement from 'ts/createElement';
import StackColorScheme from 'ts/colorScheme';
import { setupScrollspy } from 'ts/scrollspy';
import { setupSmoothAnchors } from "ts/smoothAnchors";
import { setupGitHubAlerts } from "ts/githubAlerts";

let Stack = {
    init: () => {
        /**
         * Bind menu event
         */
        menu();

        const articleContent = document.querySelector('.article-content') as HTMLElement;
        if (articleContent) {
            new StackGallery(articleContent);
            setupSmoothAnchors();
            setupScrollspy();
            setupGitHubAlerts();
        }

        /**
         * Add copy button to code block
        */
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


        new StackColorScheme(document.getElementById('dark-mode-toggle'));
    }
}

window.addEventListener('load', () => {
    setTimeout(function () {
        Stack.init();
    }, 0);
})

declare global {
    interface Window {
        createElement: any;
        Stack: any
    }
}

window.Stack = Stack;
window.createElement = createElement;