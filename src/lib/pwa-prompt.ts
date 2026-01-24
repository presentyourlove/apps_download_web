export class PWAPromptController {
  private toast: HTMLElement | null;
  private messageEl: HTMLElement | null;
  private closeBtn: HTMLElement | null;
  private updateBtn: HTMLElement | null;
  private updateSW: (reload?: boolean) => Promise<void>;

  constructor(updateSW: (reload?: boolean) => Promise<void>) {
    this.updateSW = updateSW;
    this.toast = document.getElementById('pwa-toast');
    this.messageEl = document.getElementById('pwa-toast-message');
    this.closeBtn = document.getElementById('pwa-close-btn');
    this.updateBtn = document.getElementById('pwa-update-btn');

    this.initListeners();
  }

  private initListeners() {
    this.closeBtn?.addEventListener('click', () => this.close());
    this.updateBtn?.addEventListener('click', () => this.handleUpdate());
  }

  public show(message: string = '發現新版本，請更新以獲取最佳體驗。') {
    if (this.toast && this.messageEl) {
      this.messageEl.textContent = message;
      this.toast.classList.add('show');
    }
  }

  public close() {
    this.toast?.classList.remove('show');
  }

  public handleUpdate() {
    this.updateSW(true);
  }
}
