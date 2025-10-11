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
 * 处理 GitHub 式引用块
 */
export function setupGitHubAlerts(): void {
    console.log('[GitHub Alerts] Starting setup...');
    const blockquotes = document.querySelectorAll('.article-content blockquote');
    console.log('[GitHub Alerts] Found', blockquotes.length, 'blockquotes');
    
    blockquotes.forEach((blockquote, index) => {
        const firstParagraph = blockquote.querySelector('p');
        if (!firstParagraph) return;
        
        const text = firstParagraph.textContent?.trim();
        if (!text) return;
        
    // Unified regex pattern for all alert types
    // Use greedy match .* to capture everything between { and the last }
    const alertPattern = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|THEOREM|THM|LEMMA|LEM|DEFINITION|DEF|COROLLARY|COR|PROPOSITION|PROP|PROOF|EXAMPLE|EX|REMARK|REM)\](?:\{(.*)\})?/i;
    const alertMatch = alertPattern.exec(text);
    if (!alertMatch) return;
        
        const alertType = alertMatch[1].toLowerCase();
        const titleContent = alertMatch[2] || ''; // 括号中的内容，可能为空
        
        console.log(`[GitHub Alerts] Blockquote ${index}: type=${alertType}, titleContent="${titleContent}"`);
        
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
        
        console.log(`[GitHub Alerts] Creating title for ${alertType}, displayTitle="${displayTitle}", isMathType=${isMathType}`);
        
        if (isMathType) {
            // 数学类型：只添加文本，图标由CSS处理
            titleElement.innerHTML = displayTitle;
            console.log('[GitHub Alerts] Set innerHTML, about to render math...');
            // 渲染标题中的 KaTeX 数学公式
            renderMathInTitle(titleElement);
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
            
            const textElement = document.createElement('span');
            textElement.textContent = displayTitle;
            titleElement.appendChild(textElement);
        }
        
        // 插入标题元素
        blockquote.insertBefore(titleElement, blockquote.firstChild);
        
        // 清理第一个段落中的标记 - 使用贪婪匹配以处理嵌套的大括号
        const cleanPattern = /^\[![^\]]+\](?:\{.*\})?\s*/;
        const cleanText = text.replace(cleanPattern, '').trim();
        if (cleanText) {
            firstParagraph.textContent = cleanText;
        } else {
            firstParagraph.remove();
        }
        
        // 为数学类型添加内容包装
        if (isMathType) {
            blockquote.setAttribute('data-math-env', 'true');
        }
    });
}

/**
 * 渲染标题中的数学公式
 */
function renderMathInTitle(element: HTMLElement): void {
    console.log('[KaTeX Debug] Attempting to render math in title:', element.innerHTML);
    console.log('[KaTeX Debug] renderMathInElement available?', typeof (window as any).renderMathInElement !== 'undefined');
    
    if (typeof window !== 'undefined' && (window as any).renderMathInElement) {
        try {
            console.log('[KaTeX Debug] Before rendering:', element.innerHTML);
            (window as any).renderMathInElement(element, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false}
                ],
                throwOnError: false
            });
            console.log('[KaTeX Debug] After rendering:', element.innerHTML);
        } catch (error) {
            console.error('[KaTeX Debug] Failed to render math in title:', error);
        }
    } else {
        console.warn('[KaTeX Debug] renderMathInElement not available yet');
    }
}

/**
 * 在页面加载后自动运行
 */
export function initGitHubAlerts(): void {
    // DOM 内容加载完成后运行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // 延迟执行以确保 KaTeX 已加载
            setTimeout(setupGitHubAlerts, 100);
        });
    } else {
        setTimeout(setupGitHubAlerts, 100);
    }
    
    // 为了兼容可能的动态内容加载，也在 window.load 事件后运行
    window.addEventListener('load', () => {
        setTimeout(setupGitHubAlerts, 200);
    });
}

// 导出默认函数
export default {
    setup: setupGitHubAlerts,
    init: initGitHubAlerts
};
