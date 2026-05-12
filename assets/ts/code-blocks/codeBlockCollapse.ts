// codeBlockCollapse.ts
// Wraps long code blocks in a collapsible container with a fade overlay and
// an expand/collapse toggle button.

// These must stay in sync with the SCSS variables in _codeblocks.scss:
//   $cb-collapsed-lines and $cb-pad-v
export const COLLAPSE_THRESHOLD = 10; // collapse blocks with more than this many lines
export const COLLAPSED_LINES    = 6;  // how many lines to show when collapsed

export function buildCollapse(highlight: Element, lineCount: number): void {
  if (lineCount <= COLLAPSE_THRESHOLD) return;

  // The pre or .chroma div is the direct child we want to wrap
  const inner = highlight.querySelector(':scope > pre, :scope > div.chroma');
  if (!inner) return;

  // ── Collapsible wrapper ───────────────────────────────────────────────────
  const wrapper = document.createElement('div');
  wrapper.classList.add('code-block-body', 'is-collapsed');
  // --collapsed-lines is read by the SCSS calc() for max-height
  wrapper.style.setProperty('--collapsed-lines', String(COLLAPSED_LINES));

  inner.parentNode!.insertBefore(wrapper, inner);
  wrapper.appendChild(inner);

  // ── Fade overlay ──────────────────────────────────────────────────────────
  // Gradient colour is defined in _codeblocks.scss; no inline style needed.
  const fade = document.createElement('div');
  fade.classList.add('code-block-fade');
  wrapper.appendChild(fade);

  // ── Toggle bar ────────────────────────────────────────────────────────────
  const toggleBar = document.createElement('div');
  toggleBar.classList.add('code-block-toggle-bar');

  const toggleBtn = document.createElement('button');
  toggleBtn.classList.add('code-block-toggle');
  toggleBtn.innerHTML = `
    <svg class="toggle-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
         viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
    <span>Expand</span>
  `;
  toggleBar.appendChild(toggleBtn);
  highlight.appendChild(toggleBar);

  toggleBtn.addEventListener('click', () => {
    const collapsed = wrapper.classList.toggle('is-collapsed');
    toggleBtn.querySelector('span')!.textContent = collapsed ? 'Expand' : 'Collapse';
    (toggleBtn.querySelector('.toggle-icon') as HTMLElement).style.transform =
      collapsed ? '' : 'rotate(180deg)';
    fade.style.display = collapsed ? '' : 'none';
  });
}
