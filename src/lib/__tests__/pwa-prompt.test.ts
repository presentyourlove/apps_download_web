import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PWAPromptController } from '../pwa-prompt';

describe('PWAPromptController', () => {
  let controller: PWAPromptController;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockUpdateSW: any;

  beforeEach(() => {
    // 1. Mock DOM
    document.body.innerHTML = `
      <div id="pwa-toast" class="">
        <span id="pwa-toast-message"></span>
        <button id="pwa-update-btn"></button>
        <button id="pwa-close-btn"></button>
      </div>
    `;

    // 2. Mock Update Function
    mockUpdateSW = vi.fn();

    // 3. Init Controller
    controller = new PWAPromptController(mockUpdateSW);
  });

  it('show() should add "show" class and update message', () => {
    controller.show('New Version Available');
    const toast = document.getElementById('pwa-toast');
    const message = document.getElementById('pwa-toast-message');

    expect(toast?.classList.contains('show')).toBe(true);
    expect(message?.textContent).toBe('New Version Available');
  });

  it('close() should remove "show" class', () => {
    controller.show();
    controller.close();
    const toast = document.getElementById('pwa-toast');
    expect(toast?.classList.contains('show')).toBe(false);
  });

  it('clicking close button should trigger close()', () => {
    controller.show();
    const closeBtn = document.getElementById('pwa-close-btn');
    closeBtn?.click();

    const toast = document.getElementById('pwa-toast');
    expect(toast?.classList.contains('show')).toBe(false);
  });

  it('clicking update button should trigger updateSW(true)', () => {
    const updateBtn = document.getElementById('pwa-update-btn');
    updateBtn?.click();

    expect(mockUpdateSW).toHaveBeenCalledWith(true);
  });
});
