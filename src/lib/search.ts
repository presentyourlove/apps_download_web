/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Command {
  id: string;
  title: string;
  desc?: string;
  section: 'Navigation' | 'System' | 'Apps' | 'Search Results';
  icon?: string;
  action: () => void;
}

// Icons SVG Strings
export const ICONS = {
  link: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
  app: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
  theme: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
};

export class SearchController {
  private modal: HTMLElement;
  private input: HTMLInputElement;
  private resultsContainer: HTMLElement;
  private overlay: HTMLElement | null;
  private trigger: HTMLElement;

  private pagefind: any;
  private selectedIndex = 0;
  private filteredCommands: Command[] = [];
  private baseCommands: Command[] = [];
  private debounceTimer: number = 0;

  constructor() {
    const trigger = document.getElementById('search-trigger');
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('search-input') as HTMLInputElement;
    const resultsContainer = document.getElementById('search-results');

    if (!trigger || !modal || !input || !resultsContainer) {
      throw new Error('Search DOM elements not found');
    }

    this.trigger = trigger;
    this.modal = modal;
    this.input = input;
    this.resultsContainer = resultsContainer;
    this.overlay = modal.querySelector('.search-modal-overlay');

    this.initCommands();
    this.initListeners();
  }

  private initCommands() {
    // Load data attributes
    const navPaths = JSON.parse(this.modal.dataset.navPaths || '{}');
    const appPaths = JSON.parse(this.modal.dataset.appPaths || '[]');

    this.baseCommands = [
      {
        id: 'nav-home',
        title: 'Home',
        desc: 'Go to homepage',
        section: 'Navigation',
        icon: ICONS.link,
        action: () => (window.location.href = navPaths.home),
      },
      {
        id: 'nav-blog',
        title: 'Blog',
        desc: 'Read our latest articles',
        section: 'Navigation',
        icon: ICONS.link,
        action: () => (window.location.href = navPaths.blog),
      },
      {
        id: 'nav-about',
        title: 'About',
        desc: 'Learn more about us',
        section: 'Navigation',
        icon: ICONS.link,
        action: () => (window.location.href = navPaths.about),
      },
      {
        id: 'sys-theme',
        title: 'Toggle Theme',
        desc: 'Switch between light and dark mode',
        section: 'System',
        icon: ICONS.theme,
        action: () => {
          const currentTheme = document.documentElement.getAttribute('data-theme');
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);
          this.closeModal();
        },
      },
      // App Commands
      ...appPaths.map((app: any) => ({
        id: `app-${app.id}`,
        title: app.name,
        desc: `Go to ${app.name} download page`,
        section: 'Apps',
        icon: ICONS.app,
        action: () => (window.location.href = app.path),
      })),
    ];
  }

  private initListeners() {
    this.trigger.addEventListener('click', () => this.openModal());
    this.overlay?.addEventListener('click', () => this.closeModal());

    this.input.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value.trim();
      clearTimeout(this.debounceTimer);
      this.debounceTimer = window.setTimeout(() => this.updateResults(query), 200);
    });

    window.addEventListener('keydown', (e) => this.handleKeydown(e));
  }

  private async loadPagefind() {
    if (this.pagefind) return this.pagefind;
    try {
      const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
      this.pagefind = await import(/* @vite-ignore */ `${baseUrl}/pagefind/pagefind.js`);
      await this.pagefind.options({ excerptLength: 20 });
      return this.pagefind;
    } catch (e) {
      console.error('Failed to load pagefind', e);
      return null;
    }
  }

  public async openModal() {
    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    this.input.value = '';
    this.input.focus();
    this.updateResults('');
    await this.loadPagefind();
  }

  public closeModal() {
    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
    this.input.value = '';
  }

  private async updateResults(query: string) {
    this.selectedIndex = 0;
    this.filteredCommands = [];

    // Filter static commands
    const lowerQuery = query.toLowerCase();
    this.filteredCommands = this.baseCommands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(lowerQuery) || cmd.desc?.toLowerCase().includes(lowerQuery)
    );

    // Add Pagefind results if query exists
    if (query && this.pagefind) {
      try {
        const search = await this.pagefind.search(query);
        const topResults = search.results.slice(0, 5);

        for (const result of topResults) {
          const data = await result.data();
          this.filteredCommands.push({
            id: `pf-${data.url}`,
            title: data.meta.title,
            desc: data.excerpt.replace(/<[^>]*>?/gm, ''), // strip html tags
            section: 'Search Results',
            icon: ICONS.search,
            action: () => (window.location.href = data.url),
          });
        }
      } catch (e) {
        console.error(e);
      }
    }

    this.renderList();
  }

  private renderList() {
    this.resultsContainer.innerHTML = '';

    if (this.filteredCommands.length === 0) {
      this.resultsContainer.innerHTML = `<div class="search-empty">${this.modal.dataset.noResults}</div>`;
      return;
    }

    const grouped = this.filteredCommands.reduce(
      (acc, cmd) => {
        if (!acc[cmd.section]) acc[cmd.section] = [];
        acc[cmd.section].push(cmd);
        return acc;
      },
      {} as Record<string, Command[]>
    );

    const sections: Command['section'][] = ['Navigation', 'Apps', 'System', 'Search Results'];
    let globalIndex = 0;

    sections.forEach((section) => {
      const cmds = grouped[section];
      if (cmds && cmds.length > 0) {
        const titleEl = document.createElement('div');
        titleEl.className = 'search-group-title';
        titleEl.textContent = section;
        this.resultsContainer.appendChild(titleEl);

        cmds.forEach((cmd) => {
          const el = document.createElement('div');
          el.className = `result-item ${globalIndex === this.selectedIndex ? 'selected' : ''}`;
          el.innerHTML = `
              <div class="result-icon">${cmd.icon}</div>
              <div class="result-content">
                <div class="result-title">${this.highlight(cmd.title, this.input.value)}</div>
                ${cmd.desc ? `<div class="result-desc">${cmd.desc}</div>` : ''}
              </div>
            `;

          // Click handler
          el.addEventListener('click', () => {
            cmd.action();
          });

          // Hover handler
          const currentIndex = globalIndex;
          el.addEventListener('mouseenter', () => {
            this.selectedIndex = currentIndex;
            this.updateSelection();
          });

          this.resultsContainer.appendChild(el);
          globalIndex++;
        });
      }
    });
  }

  private highlight(text: string, query: string) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  private updateSelection() {
    const items = this.resultsContainer.querySelectorAll('.result-item');
    items.forEach((item, index) => {
      if (index === this.selectedIndex) {
        item.classList.add('selected');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('selected');
      }
    });
  }

  private handleKeydown(e: KeyboardEvent) {
    // Toggle
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (this.modal.classList.contains('active')) this.closeModal();
      else this.openModal();
    }

    if (!this.modal.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredCommands.length - 1);
        this.updateSelection();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
        this.updateSelection();
        break;
      case 'Enter':
        e.preventDefault();
        if (this.filteredCommands[this.selectedIndex]) {
          this.filteredCommands[this.selectedIndex].action();
        }
        break;
    }
  }
}
