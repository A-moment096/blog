// Implements a scroll spy system for the ToC, displaying the current section with an indicator and scrolling to it when needed.

// Inspired from https://gomakethings.com/debouncing-your-javascript-events/
function debounced(func: Function) {
    let timeout;
    return () => {
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }

        timeout = window.requestAnimationFrame(() => func());
    }
}

const headersQuery = ".article-content h1[id], .article-content h2[id], .article-content h3[id], .article-content h4[id], .article-content h5[id], .article-content h6[id]";
const tocQuery = ".widget--toc";
const navigationQuery = ".widget--toc .toc-item";
const activeClass = "active-class";

function scrollToTocElement(tocElement: HTMLElement, scrollableNavigation: HTMLElement) {
    const link = tocElement.querySelector("a");
    if (!link) {
        console.warn("No link found in TOC element:", tocElement);
        return;
    }
    
    let textHeight = link.offsetHeight;
    let scrollTop = tocElement.offsetTop - scrollableNavigation.offsetHeight / 2 + textHeight / 2 - scrollableNavigation.offsetTop;
    
    if (scrollTop < 0) {
        scrollTop = 0;
    }
    scrollableNavigation.scrollTo({ top: scrollTop, behavior: "smooth" });
}

type IdToElementMap = { [key: string]: HTMLElement };

function buildIdToNavigationElementMap(navigation: NodeListOf<Element>): IdToElementMap {
    const sectionLinkRef: IdToElementMap = {};
    
    navigation.forEach((navigationElement: HTMLElement, index) => {
        const link = navigationElement.querySelector("a");
        
        if (link) {
            const href = link.getAttribute("href");
            
            if (href) {
                let id: string;
                
                // Handle both full URLs and fragment-only URLs
                if (href.indexOf("#") === 0) {
                    // Fragment-only URL like "#section-id"
                    id = href.slice(1);
                } else if (href.indexOf("#") > 0) {
                    // Full URL like "http://domain.com/page#section-id"
                    id = href.split("#")[1];
                    // Decode URL-encoded characters
                    id = decodeURIComponent(id);
                } else {
                    console.warn(`TOC link has no fragment: "${href}"`);
                    return;
                }
                
                sectionLinkRef[id] = navigationElement;
            } else {
                console.warn(`TOC link has no href:`, link);
            }
        } else {
            console.warn("TOC element has no link:", navigationElement);
        }
    });

    return sectionLinkRef;
}

function computeOffsets(headers: NodeListOf<Element>) {
    let sectionsOffsets = [];
    
    headers.forEach((header: HTMLElement, index) => { 
        sectionsOffsets.push({ id: header.id, offset: header.offsetTop });
    });
    
    sectionsOffsets.sort((a, b) => a.offset - b.offset);
    return sectionsOffsets;
}

function setupScrollspy() {
    // Wait longer and check if TOC transformation is complete
    const checkTocReady = () => {
        const tocContainer = document.querySelector(tocQuery);
        if (!tocContainer) {
            console.warn("TOC container not found, retrying...");
            setTimeout(checkTocReady, 50);
            return;
        }
        
        const tocItems = document.querySelectorAll(navigationQuery);
        const originalOls = tocContainer.querySelectorAll('ol');
        
        // Check if transformation is complete (no more ol elements, only toc-item divs)
        if (originalOls.length > 0 && tocItems.length === 0) {
            setTimeout(checkTocReady, 50);
            return;
        }
        
        initScrollspy();
    };
    
    const initScrollspy = () => {
        let headers = document.querySelectorAll(headersQuery);
        if (headers.length === 0) {
            console.warn("No headers found matching query:", headersQuery);
            return;
        }

        let scrollableNavigation = document.querySelector(tocQuery) as HTMLElement | undefined;
        if (!scrollableNavigation) {
            console.warn("No TOC found matching query:", tocQuery);
            return;
        }

        let navigation = document.querySelectorAll(navigationQuery);
        if (navigation.length === 0) {
            console.warn("No navigation items found matching query:", navigationQuery);
            return;
        }

        
        // Debug: Let's see what the raw TOC HTML looks like
        const tocContainer = document.querySelector(tocQuery);

        let sectionsOffsets = computeOffsets(headers);
        let idToNavigationElement: IdToElementMap = buildIdToNavigationElementMap(navigation);
        

        // We need to avoid scrolling when the user is actively interacting with the ToC. Otherwise, if the user clicks on a link in the ToC,
        // we would scroll their view, which is not optimal usability-wise.
        let tocHovered: boolean = false;
        scrollableNavigation.addEventListener("mouseenter", debounced(() => tocHovered = true));
        scrollableNavigation.addEventListener("mouseleave", debounced(() => tocHovered = false));

        let activeSectionLink: Element;    function scrollHandler() {
        let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

        let newActiveSection: HTMLElement | undefined;

        // Find the section that is currently active.
        // It is possible for no section to be active, so newActiveSection may be undefined.
        sectionsOffsets.forEach((section) => {
            if (scrollPosition >= section.offset - 20) {
                newActiveSection = document.getElementById(section.id);
            }
        });

        // Find the link for the active section. Once again, there are a few edge cases:
        // - No active section = no link => undefined
        // - No active section but the link does not exist in toc (e.g. because it is outside of the applicable ToC levels) => undefined
        let newActiveSectionLink: HTMLElement | undefined
        if (newActiveSection) {
            newActiveSectionLink = idToNavigationElement[newActiveSection.id];
        }

        if (newActiveSection && !newActiveSectionLink) {
            // The active section does not have a link in the ToC, so we can't scroll to it.
            console.debug("No link found for section", newActiveSection);
        } else if (newActiveSectionLink !== activeSectionLink) {
            if (activeSectionLink)
                activeSectionLink.classList.remove(activeClass);
            if (newActiveSectionLink) {
                newActiveSectionLink.classList.add(activeClass);
                if (!tocHovered) {
                    scrollToTocElement(newActiveSectionLink, scrollableNavigation);
                } 
            }
            activeSectionLink = newActiveSectionLink;
        }
    }

    window.addEventListener("scroll", debounced(scrollHandler));
    
    // Resizing may cause the offset values to change: recompute them.
    function resizeHandler() {
        sectionsOffsets = computeOffsets(headers);
        scrollHandler();
    }

    window.addEventListener("resize", debounced(resizeHandler));
    };
    
    // Start checking if TOC is ready
    setTimeout(checkTocReady, 100);
}

export { setupScrollspy };