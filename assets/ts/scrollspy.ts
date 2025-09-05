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
    console.log("scrollToTocElement called with:", tocElement, scrollableNavigation);
    const link = tocElement.querySelector("a");
    if (!link) {
        console.warn("No link found in TOC element:", tocElement);
        return;
    }
    
    let textHeight = link.offsetHeight;
    let scrollTop = tocElement.offsetTop - scrollableNavigation.offsetHeight / 2 + textHeight / 2 - scrollableNavigation.offsetTop;
    console.log("Calculated scroll values:", {
        textHeight,
        elementOffsetTop: tocElement.offsetTop,
        navigationHeight: scrollableNavigation.offsetHeight,
        navigationOffsetTop: scrollableNavigation.offsetTop,
        calculatedScrollTop: scrollTop
    });
    
    if (scrollTop < 0) {
        scrollTop = 0;
    }
    console.log("Final scrollTop:", scrollTop);
    scrollableNavigation.scrollTo({ top: scrollTop, behavior: "smooth" });
}

type IdToElementMap = { [key: string]: HTMLElement };

function buildIdToNavigationElementMap(navigation: NodeListOf<Element>): IdToElementMap {
    const sectionLinkRef: IdToElementMap = {};
    console.log("Building ID to navigation map from", navigation.length, "elements:");
    
    navigation.forEach((navigationElement: HTMLElement, index) => {
        console.log(`TOC item ${index}:`, navigationElement);
        console.log(`TOC item ${index} HTML:`, navigationElement.outerHTML);
        
        const link = navigationElement.querySelector("a");
        console.log(`TOC item ${index} link:`, link);
        
        if (link) {
            const href = link.getAttribute("href");
            console.log(`TOC item ${index}:`, {
                element: navigationElement,
                link: link,
                href: href,
                linkText: link.textContent?.trim(),
                linkHTML: link.outerHTML
            });
            
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
                console.log(`Mapped section ID "${id}" to TOC element`);
            } else {
                console.warn(`TOC link has no href:`, link);
            }
        } else {
            console.warn("TOC element has no link:", navigationElement);
        }
    });

    console.log("Final ID to navigation map:", sectionLinkRef);
    return sectionLinkRef;
}

function computeOffsets(headers: NodeListOf<Element>) {
    let sectionsOffsets = [];
    console.log("Computing offsets for", headers.length, "headers:");
    
    headers.forEach((header: HTMLElement, index) => { 
        console.log(`Header ${index}:`, {
            element: header,
            id: header.id,
            tagName: header.tagName,
            textContent: header.textContent?.trim(),
            offsetTop: header.offsetTop
        });
        sectionsOffsets.push({ id: header.id, offset: header.offsetTop });
    });
    
    sectionsOffsets.sort((a, b) => a.offset - b.offset);
    console.log("Sorted section offsets:", sectionsOffsets);
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
            console.log("TOC transformation not complete yet, retrying...");
            setTimeout(checkTocReady, 50);
            return;
        }
        
        console.log("TOC transformation appears complete, initializing scrollspy");
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

        console.log("Scrollspy initialized with", headers.length, "headers and", navigation.length, "TOC items");
        
        // Debug: Let's see what the raw TOC HTML looks like
        const tocContainer = document.querySelector(tocQuery);
        console.log("TOC container HTML:", tocContainer?.innerHTML);

        let sectionsOffsets = computeOffsets(headers);
        let idToNavigationElement: IdToElementMap = buildIdToNavigationElementMap(navigation);
        
        console.log("Section offsets:", sectionsOffsets);
        console.log("ID to navigation map:", idToNavigationElement);

        // We need to avoid scrolling when the user is actively interacting with the ToC. Otherwise, if the user clicks on a link in the ToC,
        // we would scroll their view, which is not optimal usability-wise.
        let tocHovered: boolean = false;
        scrollableNavigation.addEventListener("mouseenter", debounced(() => tocHovered = true));
        scrollableNavigation.addEventListener("mouseleave", debounced(() => tocHovered = false));

        let activeSectionLink: Element;    function scrollHandler() {
        let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
        console.log("Scroll position:", scrollPosition);

        let newActiveSection: HTMLElement | undefined;

        // Find the section that is currently active.
        // It is possible for no section to be active, so newActiveSection may be undefined.
        sectionsOffsets.forEach((section) => {
            if (scrollPosition >= section.offset - 20) {
                newActiveSection = document.getElementById(section.id);
                console.log("Active section:", section.id, "at offset:", section.offset);
            }
        });

        // Find the link for the active section. Once again, there are a few edge cases:
        // - No active section = no link => undefined
        // - No active section but the link does not exist in toc (e.g. because it is outside of the applicable ToC levels) => undefined
        let newActiveSectionLink: HTMLElement | undefined
        if (newActiveSection) {
            console.log("Looking for TOC link for section ID:", newActiveSection.id);
            console.log("Available TOC mappings:", Object.keys(idToNavigationElement));
            console.log("ID match check:", {
                sectionId: newActiveSection.id,
                sectionIdLength: newActiveSection.id.length,
                sectionIdCharCodes: newActiveSection.id.split('').map(c => c.charCodeAt(0)),
                hasMapping: newActiveSection.id in idToNavigationElement
            });
            
            newActiveSectionLink = idToNavigationElement[newActiveSection.id];
            console.log("Found TOC link for section:", newActiveSection.id, "->", newActiveSectionLink);
        }

        if (newActiveSection && !newActiveSectionLink) {
            // The active section does not have a link in the ToC, so we can't scroll to it.
            console.debug("No link found for section", newActiveSection);
        } else if (newActiveSectionLink !== activeSectionLink) {
            console.log("Changing active section from", activeSectionLink, "to", newActiveSectionLink);
            if (activeSectionLink)
                activeSectionLink.classList.remove(activeClass);
            if (newActiveSectionLink) {
                newActiveSectionLink.classList.add(activeClass);
                console.log("Added active class to:", newActiveSectionLink);
                if (!tocHovered) {
                    console.log("Scrolling TOC to element:", newActiveSectionLink);
                    // Scroll so that newActiveSectionLink is in the middle of scrollableNavigation, except when it's from a manual click (hence the tocHovered check)
                    scrollToTocElement(newActiveSectionLink, scrollableNavigation);
                } else {
                    console.log("TOC is hovered, skipping auto-scroll");
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