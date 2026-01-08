/**
 * Application Configuration
 * Centralized configuration for the application.
 */
'use strict';

const CONFIG = {
  PATHS: {
    HEADER: './components/header.html',
    FOOTER: './components/footer.html',
    COOKIE: './components/cookie-consent.html'
  },
  THEME: {
    KEY: 'pyl-theme',
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
    COLOR_LIGHT: '#f8fafc',
    COLOR_DARK: '#0f172a'
  },
  COOKIE: {
    KEY: 'cookieConsent',
    VALUE: 'accepted'
  },
  UI: {
    SCROLL_TOP_LABEL: '回到頂部',
    SCROLL_THRESHOLD: 300,
    HEADER_SCROLL_THRESHOLD: 100,
    THROTTLE_DELAY: 200,
    HEADER_THROTTLE_DELAY: 100,
    TOAST_DURATION: 3000,
    SCROLLBAR_WIDTH: 10,        // 捲軸寬度 (px)
    SCROLLBAR_RADIUS: 5,        // 捲軸圓角半徑 (px)
    FOCUS_DELAY: 100           // 焦點延遲時間 (ms)
  }
};

/**
 * Storage Wrapper
 * Safely handles localStorage operations.
 */
const safeStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('LocalStorage access denied', e);
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('LocalStorage setItem failed', e);
    }
  }
};

/**
 * Component Loader
 * Asynchronously loads HTML components into placeholders.
 * @param {string} componentPath - Path to the HTML component file
 * @param {string} placeholderId - ID of the container element
 */
async function loadComponent(componentPath, placeholderId) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
    const html = await response.text();
    document.getElementById(placeholderId).innerHTML = html;

    // If header loaded, highlight active link
    if (placeholderId === 'header-placeholder') {
      highlightActiveLink();
    }
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

/**
 * Highlights the navigation link corresponding to the current page.
 */
function highlightActiveLink() {
  const currentPath = window.location.pathname;
  // Handle root path or index.html
  const pageName = currentPath.split('/').pop() || 'index.html';

  const links = document.querySelectorAll('.nav-tab, .sidebar-tab');

  links.forEach(link => {
    const href = link.getAttribute('href');
    // Simple matching: if href matches pageName
    // Note: This assumes hrefs are relative filenames like "index.html"
    if (href === pageName || (pageName === 'index.html' && (href === './' || href === '/'))) {
      link.classList.add('active');
    }
  });
}

// Initialize theme
function initTheme() {
  const html = document.documentElement;
  const savedTheme = safeStorage.getItem(CONFIG.THEME.KEY) || CONFIG.THEME.DARK;
  html.setAttribute('data-theme', savedTheme);
}

// Theme toggle handler (will be attached after components load)
// WHY: 三段循環：dark -> light -> system -> dark
// 這讓使用者可以選擇強制 dark、強制 light 或跟隨系統設定
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const savedTheme = safeStorage.getItem(CONFIG.THEME.KEY) || CONFIG.THEME.DARK;

      // 三段循環：dark -> light -> system -> dark
      let newTheme;
      if (savedTheme === CONFIG.THEME.DARK) {
        newTheme = CONFIG.THEME.LIGHT;
      } else if (savedTheme === CONFIG.THEME.LIGHT) {
        newTheme = CONFIG.THEME.SYSTEM;
      } else {
        newTheme = CONFIG.THEME.DARK;
      }

      // 計算實際顯示的主題
      let effectiveTheme = newTheme;
      if (newTheme === CONFIG.THEME.SYSTEM) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        effectiveTheme = prefersDark ? CONFIG.THEME.DARK : CONFIG.THEME.LIGHT;
      }

      html.setAttribute('data-theme', effectiveTheme);

      // Update theme color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', effectiveTheme === CONFIG.THEME.DARK ? CONFIG.THEME.COLOR_DARK : CONFIG.THEME.COLOR_LIGHT);
      }

      safeStorage.setItem(CONFIG.THEME.KEY, newTheme);

      // 顯示 Toast 提示目前模式
      const modeLabels = {
        [CONFIG.THEME.DARK]: '深色模式',
        [CONFIG.THEME.LIGHT]: '淺色模式',
        [CONFIG.THEME.SYSTEM]: '跟隨系統'
      };
      showToast(`已切換至${modeLabels[newTheme]}`);
    });
  }
}

// Tab Navigation (will be initialized after components load)
let navTabs, sidebarTabs, footerLinks, tabContents;
let mobileMenuToggle, mobileSidebar, sidebarClose, sidebarOverlay;

// Function to switch tabs
// Set active navigation tab based on current URL
function setActiveNav() {
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop() || 'index.html';

  // Helper to set active class
  const setActive = (link) => {
    const href = link.getAttribute('href');
    if (href === pageName || (pageName === 'index.html' && href === './') || (pageName === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  };

  navTabs.forEach(setActive);
  sidebarTabs.forEach(setActive);
  if (footerLinks) footerLinks.forEach(setActive);
}

// App card click handlers

/**
 * Focus Trap Logic (焦點陷阱)
 * 
 * WHY: 為了符合 WCAG 無障礙標準，當模態視窗（如 Sidebar）開啟時，
 * 必須將鍵盤焦點限制在該視窗內，防止焦點跳到背景內容。
 * 這對螢幕閱讀器使用者至關重要，確保他們不會迷失在頁面中。
 * 
 * HOW: 監聽 Tab/Shift+Tab 鍵，當焦點到達邊界時循環回到另一端。
 * 同時支援 Escape 鍵快速關閉，符合使用者預期的操作方式。
 * 
 * @param {KeyboardEvent} e - 鍵盤事件
 * @param {HTMLElement} element - 需要陷阱焦點的容器元素
 */
const focusTrap = (e, element) => {
  const focusableElements = element.querySelectorAll('a[href], button:not([disabled]), textarea, input, select');
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.key === 'Tab') {
    if (e.shiftKey) { // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else { // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  } else if (e.key === 'Escape') {
    closeSidebar();
  }
};

const handleFocusTrap = (e) => focusTrap(e, mobileSidebar);

// Mobile sidebar functions
function openSidebar() {
  mobileSidebar.classList.add('active');
  sidebarOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Trap focus
  mobileSidebar.addEventListener('keydown', handleFocusTrap);
  const closeBtn = document.getElementById('sidebar-close');
  // WHY: 延遲焦點設定是為了等待 CSS 動畫完成（sidebar 滑入動畫），
  // 避免在元素還未完全顯示時就嘗試聚焦，這可能導致螢幕閱讀器混淆。
  if (closeBtn) setTimeout(() => closeBtn.focus(), CONFIG.UI.FOCUS_DELAY);
  if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'true');
}

function closeSidebar() {
  mobileSidebar.classList.remove('active');
  sidebarOverlay.classList.remove('active');
  document.body.style.overflow = '';

  // Remove trap
  mobileSidebar.removeEventListener('keydown', handleFocusTrap);
  if (mobileMenuToggle) {
    mobileMenuToggle.focus();
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
  }
}


// Initialize all components and event handlers
// Initialize all components and event handlers
window.addEventListener('DOMContentLoaded', async () => {
  // Load components first
  await loadComponent(CONFIG.PATHS.HEADER, 'header-placeholder');
  await loadComponent(CONFIG.PATHS.FOOTER, 'footer-placeholder');

  // Initialize theme
  initTheme();

  // Initialize theme toggle
  initThemeToggle();

  // Initialize DOM references
  navTabs = document.querySelectorAll('.nav-tab');
  sidebarTabs = document.querySelectorAll('.sidebar-tab');
  footerLinks = document.querySelectorAll('.footer-link');
  mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  mobileSidebar = document.getElementById('mobile-sidebar');
  sidebarClose = document.getElementById('sidebar-close');
  sidebarOverlay = document.getElementById('sidebar-overlay');

  // Set active navigation
  setActiveNav();

  // Attach event handlers
  attachEventHandlers();

  // Load Cookie Consent
  if (!safeStorage.getItem(CONFIG.COOKIE.KEY)) {
    await loadComponent(CONFIG.PATHS.COOKIE, 'cookie-placeholder');
    const cookieBanner = document.getElementById('cookie-consent');
    if (cookieBanner) {
      cookieBanner.style.display = 'block';
      const acceptBtn = document.getElementById('cookie-accept');
      if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
          safeStorage.setItem(CONFIG.COOKIE.KEY, CONFIG.COOKIE.VALUE);
          cookieBanner.style.display = 'none';
        });
      }
    }
  }
});

/**
 * Throttle Utility (節流函式)
 * 
 * WHY: 在處理高頻率事件（如 scroll, resize）時，必須限制函式執行頻率
 * 以避免效能問題。選擇 throttle 而非 debounce 的原因是：
 * - throttle: 確保函式在固定時間間隔內至少執行一次（適合滾動進度追蹤）
 * - debounce: 只在事件停止後執行（適合搜尋輸入）
 * 
 * 使用 throttle 可確保使用者在滾動時能看到即時反饋（如 header 隱藏），
 * 而不是等到滾動完全停止才有反應。
 * 
 * @param {Function} func - The function to throttle
 * @param {number} limit - The limit in milliseconds
 * @returns {Function} Throttled function
 */
const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

// Scroll to Top Logic
function initScrollToTop() {
  const scrollBtn = document.getElementById('scroll-top');

  if (!scrollBtn) return;

  window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > CONFIG.UI.SCROLL_THRESHOLD) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }, CONFIG.UI.THROTTLE_DELAY), { passive: true });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Prefetch Links Logic
function prefetchLinks() {
  const links = document.querySelectorAll('a');

  links.forEach(link => {
    if (link.href && link.href.startsWith(window.location.origin) && !link.href.includes('#')) {
      const prefetchHandler = () => {
        if (!document.querySelector(`link[rel="prefetch"][href="${link.href}"]`)) {
          const prefetchTag = document.createElement('link');
          prefetchTag.rel = 'prefetch';
          prefetchTag.href = link.href;
          document.head.appendChild(prefetchTag);
        }
      };

      link.addEventListener('mouseenter', prefetchHandler, { once: true });
      link.addEventListener('touchstart', prefetchHandler, { once: true, passive: true });
    }
  });
}


/**
 * Smart Sticky Header Logic
 * Hides header on scroll down, shows on scroll up.
 */
function initSmartHeader() {
  let lastScrollTop = 0;
  const header = document.querySelector('.header');

  if (!header) return;

  window.addEventListener('scroll', throttle(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > CONFIG.UI.HEADER_SCROLL_THRESHOLD) {
      // Scrolling down & past header
      header.classList.add('header-hidden');
    } else {
      // Scrolling up
      header.classList.remove('header-hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  }, CONFIG.UI.HEADER_THROTTLE_DELAY), { passive: true });
}

/**
 * Toast Notification Logic
 * Displays a non-intrusive toast message.
 * @param {string} message - The message to display
 * @param {string} type - 'success', 'error', or 'info'
 */
function showToast(message, type = 'success') {
  let toast = document.getElementById('toast-notification');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-notification';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  // Icon based on type (currently simple checkmark)
  const iconHtml = `
    <div class="toast-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  `;

  toast.innerHTML = `${iconHtml}<span>${message}</span>`;

  // Force reflow
  void toast.offsetWidth;

  toast.classList.add('show');

  // Hide after 3 seconds
  if (window.toastTimeout) clearTimeout(window.toastTimeout);

  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, CONFIG.UI.TOAST_DURATION);
}

/**
 * Share Button Logic
 * tailored for both Mobile (Native Share) and Desktop (Clipboard).
 */
function initShareButton() {
  const shareBtns = document.querySelectorAll('[data-share-btn]');

  shareBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const shareData = {
        title: btn.getAttribute('data-title') || document.title,
        text: btn.getAttribute('data-text') || '',
        url: btn.getAttribute('data-url') || window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.error('Share failed:', err);
            showToast('分享失敗，請稍後再試');
          }
        }
      } else {
        // Fallback to clipboard
        try {
          await navigator.clipboard.writeText(shareData.url);
          showToast('連結已複製到剪貼簿');
        } catch (err) {
          console.error('Clipboard failed:', err);
          showToast('複製失敗');
        }
      }
    });
  });
}

// PWA Install Prompt Logic
function initInstallPrompt() {
  let deferredPrompt;
  const installBtns = document.querySelectorAll('.install-trigger');
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (installBtns.length === 0) return;

  // Handler for Install Button Click
  const handleInstallClick = async (e) => {
    const btn = e.currentTarget;

    if (isIOS) {
      // iOS Guide
      showToast('請點擊分享按鈕 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>，選擇「加入主畫面」', 'info');
    } else {
      // Android/Desktop Prompt
      if (deferredPrompt) {
        // Hide the app provided install promotion
        installBtns.forEach(b => b.hidden = true);
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for user choice
        const { outcome } = await deferredPrompt.userChoice;
        // Reset deferredPrompt
        deferredPrompt = null;
      }
    }
  };

  // 1. Initial State Setup
  // If iOS, always show button
  if (isIOS) {
    installBtns.forEach(btn => btn.hidden = false);
  }

  // 2. Event Listeners
  // Listen for 'beforeinstallprompt' (Android/Desktop)
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtns.forEach(btn => btn.hidden = false);
  });

  // Listen for 'appinstalled'
  window.addEventListener('appinstalled', () => {
    installBtns.forEach(btn => btn.hidden = true);
    deferredPrompt = null;
  });

  // 3. Bind Click Handlers
  installBtns.forEach(btn => {
    btn.addEventListener('click', handleInstallClick);
  });
}

/**
 * Offline Page Logic
 * Handles retry button and online/offline events.
 */
function initOfflinePage() {
  const retryBtn = document.getElementById('retry-btn');
  if (!retryBtn) return;

  retryBtn.addEventListener('click', () => {
    window.location.reload();
  });

  window.addEventListener('online', () => {
    window.location.reload();
  });
}

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(reg => {

    // Check if there's an update in waiting state (e.g. from previous load)
    if (reg.waiting) {
      showUpdateToast();
    }

    reg.addEventListener('updatefound', () => {
      const newWorker = reg.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          showUpdateToast();
        }
      });
    });

  }).catch(error => console.error('SW Registration failed:', error));
}

function showUpdateToast() {
  showToast('發現新版本，點擊此處重新整理');
  const toast = document.getElementById('toast-notification');
  if (toast) {
    toast.onclick = () => window.location.reload();
  }
}

// Attach all event handlers
function attachEventHandlers() {
  // Initialize Scroll to Top
  initScrollToTop();

  // Initialize Link Prefetching
  prefetchLinks();

  // Initialize Smart Header
  initSmartHeader();

  // Initialize Share Buttons
  initShareButton();

  // Initialize Install Prompt
  initInstallPrompt();

  // Initialize Offline Page
  initOfflinePage();

  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', openSidebar);
  }

  // Sidebar close button
  if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
  }

  // Sidebar overlay click
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }
}

// Handle browser back/forward buttons (BFcache)
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    closeSidebar();
  }
});
