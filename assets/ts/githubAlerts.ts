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

const alertConfigs: AlertConfig[] = [
    {
        pattern: /^\[!NOTE\]/i,
        className: 'github-note',
        icon: 'info',
        title: 'Note'
    },
    {
        pattern: /^\[!TIP\]/i,
        className: 'github-tip',
        icon: 'light-bulb',
        title: 'Tip'
    },
    {
        pattern: /^\[!IMPORTANT\]/i,
        className: 'github-important',
        icon: 'report',
        title: 'Important'
    },
    {
        pattern: /^\[!WARNING\]/i,
        className: 'github-warning',
        icon: 'alert',
        title: 'Warning'
    },
    {
        pattern: /^\[!CAUTION\]/i,
        className: 'github-caution',
        icon: 'stop',
        title: 'Caution'
    }
];

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
function createTitleElement(config: AlertConfig): HTMLElement {
    const titleElement = document.createElement('div');
    titleElement.className = 'github-alert-title';
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
    iconElement.style.cssText = 'flex-shrink: 0;';
    
    const titleSpan = document.createElement('span');
    titleSpan.textContent = config.title;
    titleSpan.className = 'github-alert-title-text';
    
    titleElement.appendChild(iconElement);
    titleElement.appendChild(titleSpan);
    
    return titleElement;
}

/**
 * 处理 GitHub 式引用块
 */
export function setupGitHubAlerts(): void {
    const blockquotes = document.querySelectorAll('.article-content blockquote');
    
    blockquotes.forEach((blockquote, index) => {
        const firstParagraph = blockquote.querySelector('p');
        if (!firstParagraph) return;
        
        const text = firstParagraph.textContent?.trim();
        if (!text) return;
        
        // 检查是否匹配任何警告类型
        for (const config of alertConfigs) {
            if (config.pattern.test(text)) {
                // 添加相应的样式类
                blockquote.classList.add(config.className);
                
                // 创建并插入标题元素
                const titleElement = createTitleElement(config);
                blockquote.insertBefore(titleElement, blockquote.firstChild);
                
                // 移除 [!TYPE] 标记从第一个段落
                const cleanText = text.replace(config.pattern, '').trim();
                if (cleanText) {
                    firstParagraph.textContent = cleanText;
                } else {
                    // 如果第一个段落只有标记，则移除整个段落
                    firstParagraph.remove();
                }
                
                break;
            }
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
