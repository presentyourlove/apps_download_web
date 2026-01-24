/**
 * Traps focus within a given container for accessibility.
 * Returns a cleanup function to remove listeners.
 */
export function trapFocus(container: HTMLElement) {
  const focusableElementsString =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

  const focusableElements = Array.from(
    container.querySelectorAll(focusableElementsString)
  ) as HTMLElement[];

  const firstTabStop = focusableElements[0];
  const lastTabStop = focusableElements[focusableElements.length - 1];

  function handleKeydown(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;

    // Shift + Tab
    if (e.shiftKey) {
      if (document.activeElement === firstTabStop) {
        e.preventDefault();
        lastTabStop.focus();
      }
    }
    // Tab
    else {
      if (document.activeElement === lastTabStop) {
        e.preventDefault();
        firstTabStop.focus();
      }
    }
  }

  container.addEventListener('keydown', handleKeydown);

  // Focus the first element initially
  if (firstTabStop) {
    firstTabStop.focus();
  }

  // Return cleanup
  return () => {
    container.removeEventListener('keydown', handleKeydown);
  };
}
