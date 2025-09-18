/*!
 * GitHub 式引用块转换器
 * 将 [!NOTE], [!WARNING] 等标记转换为相应的样式类
 */

interface AlertConfig {
    pattern: RegExp;
    className: string;
    icon: string;
    title: string;
}

/**
 * 创建 GitHub 风格的 SVG 图标
 */
function createSvgIcon(iconType: string): SVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('fill', 'currentColor');
    svg.style.cssText = 'display: inline-block; user-select: none; vertical-align: text-bottom;';

    let pathData = '';
    
    switch (iconType) {
        case 'info': // NOTE
            pathData = 'M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1A.75.75 0 0 1 9 7.75v3.5a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1-.75-.75v-3.5ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z';
            break;
        case 'light-bulb': // TIP
            pathData = 'M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304C12 3.19 10.363 1.5 8 1.5Z M5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z';
            break;
        case 'report': // IMPORTANT
            pathData = 'M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z';
            break;
        case 'alert': // WARNING
            pathData = 'M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z';
            break;
        case 'stop': // CAUTION
            pathData = 'M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z';
            break;
        // Mathematical icons
        case 'theorem':
            pathData = 'M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1-1-1V3zm2 2v8h8V5H4zm1 1h6v2H5V6zm0 3h4v1H5V9z';
            break;
        case 'lemma':
            pathData = 'M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 11.5 2h-7zM3.5 4.5A1 1 0 0 1 4.5 3.5h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-7zm2 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z';
            break;
        case 'definition':
            pathData = 'M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3zm1.5 0v10h9V3h-9zM5 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zM5.5 11a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3z';
            break;
        case 'corollary':
            pathData = 'M8.5 1.5A6.5 6.5 0 0 1 15 8a6.5 6.5 0 0 1-6.5 6.5A6.5 6.5 0 0 1 2 8a6.5 6.5 0 0 1 6.5-6.5zM8 5a.75.75 0 0 0-.75.75v2.5a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8 5zm0 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z';
            break;
        case 'proposition':
            pathData = 'M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304C12 3.19 10.363 1.5 8 1.5Z M5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z';
            break;
        case 'proof':
            pathData = 'M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 11.94l6.72-6.72a.75.75 0 0 1 1.06 0z';
            break;
        case 'example':
            pathData = 'M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z';
            break;
        case 'remark':
            pathData = 'M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 13H10l-2.573 2.573A1.458 1.458 0 0 1 5 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25H6.5a.75.75 0 0 1 .75.75V13l2.72-2.72a.75.75 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25Zm4.5 4.5a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM8 5a.75.75 0 1 1 0 1.5A.75.75 0 0 1 8 5Zm2.25 1.75a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Z';
            break;
        default:
            pathData = 'M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z';
    }

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    svg.appendChild(path);

    return svg;
}

/**
 * 创建标题元素
 */
// Type mapping object for unified processing

/**
 * 处理 GitHub 式引用块
 */
export function setupGitHubAlerts(): void {
    const blockquotes = document.querySelectorAll('.article-content blockquote');
    
    blockquotes.forEach((blockquote) => {
        const firstParagraph = blockquote.querySelector('p');
        if (!firstParagraph) return;
        
        const text = firstParagraph.textContent?.trim();
        if (!text) return;
        
    // Unified regex pattern for all alert types
    const alertPattern = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|THEOREM|THM|LEMMA|LEM|DEFINITION|DEF|COROLLARY|COR|PROPOSITION|PROP|PROOF|EXAMPLE|EX|REMARK|REM)\](?:\{([^}]*)\})?/i;
    const alertMatch = alertPattern.exec(text);
    if (!alertMatch) return;
        
        const alertType = alertMatch[1].toLowerCase();
        const titleContent = alertMatch[2] || ''; // 括号中的内容，可能为空
        
        // 映射类型到配置
        const typeMapping: { [key: string]: { className: string; title: string; icon: string } } = {
            'note': { className: 'github-note', title: 'Note', icon: 'info' },
            'tip': { className: 'github-tip', title: 'Tip', icon: 'light-bulb' },
            'important': { className: 'github-important', title: 'Important', icon: 'report' },
            'warning': { className: 'github-warning', title: 'Warning', icon: 'alert' },
            'caution': { className: 'github-caution', title: 'Caution', icon: 'stop' },
            'theorem': { className: 'math-theorem', title: 'Theorem', icon: 'theorem' },
            'thm': { className: 'math-theorem', title: 'Theorem', icon: 'theorem' },
            'lemma': { className: 'math-lemma', title: 'Lemma', icon: 'lemma' },
            'lem': { className: 'math-lemma', title: 'Lemma', icon: 'lemma' },
            'definition': { className: 'math-definition', title: 'Definition', icon: 'definition' },
            'def': { className: 'math-definition', title: 'Definition', icon: 'definition' },
            'corollary': { className: 'math-corollary', title: 'Corollary', icon: 'corollary' },
            'cor': { className: 'math-corollary', title: 'Corollary', icon: 'corollary' },
            'proposition': { className: 'math-proposition', title: 'Proposition', icon: 'proposition' },
            'prop': { className: 'math-proposition', title: 'Proposition', icon: 'proposition' },
            'proof': { className: 'math-proof', title: 'Proof', icon: 'proof' },
            'example': { className: 'math-example', title: 'Example', icon: 'example' },
            'ex': { className: 'math-example', title: 'Example', icon: 'example' },
            'remark': { className: 'math-remark', title: 'Remark', icon: 'remark' },
            'rem': { className: 'math-remark', title: 'Remark', icon: 'remark' }
        };
        
        const config = typeMapping[alertType];
        if (!config) return;
        
        // 添加样式类
        blockquote.classList.add(config.className);
        
        // 构建标题
        let displayTitle = config.title;
        if (titleContent.trim()) {
            // 检查是否以数字开头 (如 "1.1" 或 "1.1 Custom Name")
            const numberMatch = titleContent.trim().match(/^(\d+(?:\.\d+)*(?:\.[A-Za-z]+)*)\s*(.*)$/);
            if (numberMatch) {
                const number = numberMatch[1];
                const name = numberMatch[2].trim();
                displayTitle = name ? `${config.title} ${number} ${name}` : `${config.title} ${number}`;
            } else {
                // 纯文本标题（如 "of Theorem 1.1" 或 "Custom Name"）
                displayTitle = `${config.title} ${titleContent.trim()}`;
            }
        }
        
        // 创建标题元素
        const titleElement = document.createElement('div');
        const isMathType = config.className.indexOf('math-') === 0;
        titleElement.className = isMathType ? 'math-title' : 'github-alert-title';
        
        if (isMathType) {
            // 数学类型：只添加文本，图标由CSS处理
            titleElement.textContent = displayTitle;
        } else {
            // GitHub alert类型：添加图标和文本
            titleElement.style.cssText = `
                font-weight: bold;
                margin-bottom: 8px;
                font-size: 0.9em;
                letter-spacing: 0.5px;
                display: flex;
                align-items: center;
                gap: 8px;
            `;
            
            const iconElement = createSvgIcon(config.icon);
            const textElement = document.createElement('span');
            textElement.textContent = displayTitle;
            
            titleElement.appendChild(iconElement);
            titleElement.appendChild(textElement);
        }
        
        // 插入标题元素
        blockquote.insertBefore(titleElement, blockquote.firstChild);
        
        // 清理第一个段落中的标记
        const cleanPattern = /^\[![^\]]+\](?:\{[^}]*\})?\s*/;
        const cleanText = text.replace(cleanPattern, '').trim();
        if (cleanText) {
            firstParagraph.textContent = cleanText;
        } else {
            firstParagraph.remove();
        }
        
        // 为数学类型添加内容包装
        if (isMathType) {
            const contentDiv = document.createElement('div');
            contentDiv.className = 'math-content';
            
            // 移动所有非标题内容到 math-content div
            const children = blockquote.children;
            const elementsToMove: Element[] = [];
            for (let i = 1; i < children.length; i++) { // 跳过标题
                elementsToMove.push(children[i]);
            }
            elementsToMove.forEach(element => {
                contentDiv.appendChild(element);
            });
            blockquote.appendChild(contentDiv);
        }
    });
}

/**
 * 在页面加载后自动运行
 */
export function initGitHubAlerts(): void {
    // DOM 内容加载完成后运行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupGitHubAlerts);
    } else {
        setupGitHubAlerts();
    }
    
    // 为了兼容可能的动态内容加载，也在 window.load 事件后运行
    window.addEventListener('load', () => {
        setTimeout(setupGitHubAlerts, 100);
    });
}

// 导出默认函数
export default {
    setup: setupGitHubAlerts,
    init: initGitHubAlerts
};
