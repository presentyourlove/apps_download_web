/**
 * 應用程式設定 (Application Configuration)
 * 集中管理應用程式的所有設定參數。
 */
import { i18n } from './i18n.js';
import { getThemeFromSchedule } from './utils.js';
import { requestPermission, subscribeToPush, checkPermission } from './push-client.js';
import { queryLastUpdated } from './graphql-client.js';

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
    SCHEDULE: 'schedule',
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
    CHECK_UPDATE_INTERVAL: 1000 * 60 * 60 * 24, // 24小時檢查一次
    SCROLLBAR_WIDTH: 10,
    SCROLLBAR_RADIUS: 5,
    FOCUS_DELAY: 100
  }
};

/**
 * 本地儲存包裝器 (Storage Wrapper)
 * 安全地處理 localStorage 操作，避免在無權限時拋出錯誤。
 */
const safeStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('無法讀取 LocalStorage', e);
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('無法寫入 LocalStorage', e);
    }
  }
};

/**
 * 設定 PWA 應用程式徽章 (App Badging)
 * @param {number} count - 徽章數字 (0 為清除)
 */
async function setAppBadge(count) {
  if ('setAppBadge' in navigator) {
    try {
      if (count > 0) {
        await navigator.setAppBadge(count);
      } else {
        await navigator.clearAppBadge();
      }
    } catch {
      // console.debug('無法設定徽章:', error);
    }
  }
}

/**
 * 檢查應用程式更新 (Check for App Updates)
 * 自動比對本地版本與伺服器版本。
 * 優先使用 GraphQL API,失敗時自動切換至 RESTful API (Fallback 機制)
 */
async function checkForAppUpdates() {
  const lastCheck = safeStorage.getItem('last-update-check');
  const now = Date.now();

  // 避免頻繁檢查 (每天最多一次)
  if (lastCheck && (now - parseInt(lastCheck)) < CONFIG.UI.CHECK_UPDATE_INTERVAL) {
    return;
  }

  let lastUpdated;

  try {
    // 優先嘗試 GraphQL API
    lastUpdated = await queryLastUpdated();
    console.log('✅ 使用 GraphQL API 查詢成功');
  } catch (graphqlError) {
    console.warn('⚠️ GraphQL API 查詢失敗,切換至 RESTful API:', graphqlError.message);

    try {
      // Fallback: 使用原有的 RESTful API
      const response = await fetch('./api/versions.json');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      lastUpdated = data.lastUpdated;
      console.log('✅ 使用 RESTful API 查詢成功 (Fallback)');
    } catch (restError) {
      console.error('❌ RESTful API 也查詢失敗:', restError);
      // 兩種方式都失敗,清除徽章並記錄檢查時間
      setAppBadge(0);
      safeStorage.setItem('last-update-check', now.toString());
      return;
    }
  }

  // 比對版本
  try {
    const serverDate = new Date(lastUpdated).getTime();
    const localDateStr = safeStorage.getItem('app-last-updated');
    const localDate = localDateStr ? new Date(localDateStr).getTime() : 0;

    // 若伺服器版本較新
    if (serverDate > localDate) {
      showToast('發現應用程式新版本！', 'info');
      // 設定徽章提示更新
      setAppBadge(1);
      // 更新本地記錄
      safeStorage.setItem('app-last-updated', lastUpdated);
    } else {
      // 若已是最新,清除徽章
      setAppBadge(0);
    }

    safeStorage.setItem('last-update-check', now.toString());
  } catch (error) {
    console.error('版本比對失敗:', error);
    setAppBadge(0);
  }
}

/**
 * 元件載入器 (Component Loader)
 * 非同步載入 HTML 元件至指定位置。
 * @param {string} componentPath - HTML 元件檔案路徑
 * @param {string} placeholderId - 容器元素 ID
 */
async function loadComponent(componentPath, placeholderId) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) throw new Error(`無法載入 ${componentPath}`);
    const html = await response.text();
    const element = document.getElementById(placeholderId);
    if (element) {
      element.innerHTML = html;
      // 若載入的是 Header，則高亮當前連結
      if (placeholderId === 'header-placeholder') {
        highlightActiveLink();
      }
    }
  } catch (error) {
    console.error('載入元件時發生錯誤:', error);
  }
}

/**
 * 高亮目前頁面對應的導覽連結
 */
function highlightActiveLink() {
  const currentPath = window.location.pathname;
  // 處理根路徑或 index.html
  const pageName = currentPath.split('/').pop() || 'index.html';

  const links = document.querySelectorAll('.nav-tab, .sidebar-tab');

  links.forEach(link => {
    const href = link.getAttribute('href');
    // 簡單比對：若 href 符合 pageName
    if (href === pageName || (pageName === 'index.html' && (href === './' || href === '/'))) {
      link.classList.add('active');
    }
  });
}

/**
 * 顯示 Toast 通知
 * @param {string} message - 顯示訊息
 * @param {string} type - 訊息類型 ('success', 'info', 'error')
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

  // 根據類型選擇圖示
  let iconSvg = '<polyline points="20 6 9 17 4 12"></polyline>'; // 預設成功勾勾

  if (type === 'info') {
    // 資訊圖示 (圓框 i)
    iconSvg = '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>';
  } else if (type === 'error') {
    // 錯誤圖示 (圓框 x)
    iconSvg = '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>';
  }

  const iconHtml = `
    <div class="toast-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${iconSvg}
      </svg>
    </div>
  `;

  toast.innerHTML = `${iconHtml}<span>${message}</span>`;

  // 顯示 Toast
  toast.classList.add('show');

  // 自動隱藏
  setTimeout(() => {
    toast.classList.remove('show');
  }, CONFIG.UI.TOAST_DURATION);
}

/**
 * 初始化主題切換功能
 * 處理深色、淺色、系統跟隨與排程模式的切換邏輯。
 */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const savedTheme = safeStorage.getItem(CONFIG.THEME.KEY) || CONFIG.THEME.DARK;

      // 四段循環：dark -> light -> system -> schedule -> dark
      let newTheme;
      if (savedTheme === CONFIG.THEME.DARK) {
        newTheme = CONFIG.THEME.LIGHT;
      } else if (savedTheme === CONFIG.THEME.LIGHT) {
        newTheme = CONFIG.THEME.SYSTEM;
      } else if (savedTheme === CONFIG.THEME.SYSTEM) {
        newTheme = CONFIG.THEME.SCHEDULE;
      } else {
        newTheme = CONFIG.THEME.DARK;
      }

      // 計算實際要顯示的主題
      let effectiveTheme = newTheme;
      if (newTheme === CONFIG.THEME.SYSTEM) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        effectiveTheme = prefersDark ? CONFIG.THEME.DARK : CONFIG.THEME.LIGHT;
      } else if (newTheme === CONFIG.THEME.SCHEDULE) {
        effectiveTheme = getThemeFromSchedule(new Date()) === 'dark' ? CONFIG.THEME.DARK : CONFIG.THEME.LIGHT;
      }

      html.setAttribute('data-theme', effectiveTheme);

      // 更新手機瀏覽器的網址列顏色
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', effectiveTheme === CONFIG.THEME.DARK ? CONFIG.THEME.COLOR_DARK : CONFIG.THEME.COLOR_LIGHT);
      }

      safeStorage.setItem(CONFIG.THEME.KEY, newTheme);

      // 顯示 Toast 提示目前模式
      const modeLabels = {
        [CONFIG.THEME.DARK]: '深色模式',
        [CONFIG.THEME.LIGHT]: '淺色模式',
        [CONFIG.THEME.SYSTEM]: '跟隨系統',
        [CONFIG.THEME.SCHEDULE]: '定時切換'
      };
      showToast(`已切換至${modeLabels[newTheme]}`);
    });

    // 定期檢查主題狀態
    setInterval(() => {
      const savedTheme = safeStorage.getItem(CONFIG.THEME.KEY);
      if (savedTheme === CONFIG.THEME.SCHEDULE) {
        const effectiveTheme = getThemeFromSchedule(new Date()) === 'dark' ? CONFIG.THEME.DARK : CONFIG.THEME.LIGHT;

        if (document.documentElement.getAttribute('data-theme') !== effectiveTheme) {
          document.documentElement.setAttribute('data-theme', effectiveTheme);
          const metaThemeColor = document.querySelector('meta[name="theme-color"]');
          if (metaThemeColor) {
            metaThemeColor.setAttribute('content', effectiveTheme === CONFIG.THEME.DARK ? CONFIG.THEME.COLOR_DARK : CONFIG.THEME.COLOR_LIGHT);
          }
        }
      }
    }, 60000); // 每分鐘檢查
  }
}

/**
 * 初始化回到頂部按鈕
 */
function initScrollToTop() {
  const scrollBtn = document.getElementById('scroll-top');

  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > CONFIG.UI.SCROLL_THRESHOLD) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 初始化智慧 Header
 * 處理頁面捲動時 Header 的隱藏與顯示。
 */
function initSmartHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // 向下捲動超過閾值則隱藏，向上捲動則顯示
        if (currentScrollY > CONFIG.UI.HEADER_SCROLL_THRESHOLD && currentScrollY > lastScrollY) {
          header.classList.add('header-hidden');
        } else {
          header.classList.remove('header-hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * 初始化分享按鈕 (Web Share API)
 */
function initShareButton() {
  // 尋找所有帶有 'share-btn' class 的按鈕
  const shareBtns = document.querySelectorAll('.share-btn');

  if (navigator.share) {
    shareBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        try {
          await navigator.share({
            title: document.title,
            text: document.querySelector('meta[name="description"]')?.content,
            url: window.location.href
          });
          showToast('分享成功！');
        } catch {
          // console.debug('分享已取消或失敗', err);
        }
      });
    });
  } else {
    // 若不支援 Web Share API，則隱藏分享按鈕
    shareBtns.forEach(btn => btn.style.display = 'none');
  }
}

/**
 * 連結預先載入 (Prefetch Links)
 * 當滑鼠懸停在連結上時，預先載入目標頁面。
 */
function prefetchLinks() {
  const links = document.querySelectorAll('a[href$=".html"]');

  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const href = link.getAttribute('href');
      if (href) {
        const linkRel = document.createElement('link');
        linkRel.rel = 'prefetch';
        linkRel.href = href;
        document.head.appendChild(linkRel);
      }
    }, { once: true }); // 每個連結只觸發一次
  });
}

/**
 * 初始化 PWA 安裝提示 (Install Prompt)
 */
function initInstallPrompt() {
  let deferredPrompt;
  const installBtns = document.querySelectorAll('.install-trigger');
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // 處理安裝按鈕點擊
  const handleInstallClick = async () => {
    if (isIOS) {
      // iOS 引導
      showToast('請點擊分享按鈕 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>，選擇「加入主畫面」', 'info');
    } else {
      // Android/Desktop 提示
      if (deferredPrompt) {
        // 隱藏自定義安裝按鈕
        installBtns.forEach(b => b.hidden = true);
        // 顯示原生提示
        deferredPrompt.prompt();
        // 等待使用者回應
        await deferredPrompt.userChoice;
        // console.log(`使用者安裝選擇: ${outcome}`);
        // 重置
        deferredPrompt = null;
      }
    }
  };

  // 1. 初始狀態設定
  if (isIOS) {
    installBtns.forEach(btn => btn.hidden = false);
  }

  // 2. 事件監聽
  window.addEventListener('beforeinstallprompt', (e) => {
    // 防止 Chrome 67+ 自動顯示提示
    e.preventDefault();
    deferredPrompt = e;
    installBtns.forEach(btn => btn.hidden = false);
  });

  window.addEventListener('appinstalled', () => {
    installBtns.forEach(btn => btn.hidden = true);
    deferredPrompt = null;
    // console.log('PWA 已安裝');
  });

  // 3. 綁定點擊事件
  installBtns.forEach(btn => {
    btn.addEventListener('click', handleInstallClick);
  });
}

/**
 * 初始化離線頁面邏輯
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

/**
 * 行動版側邊欄控制
 */
function initMobileSidebar() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileSidebar = document.getElementById('mobile-sidebar');
  const sidebarClose = document.getElementById('sidebar-close');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  function openSidebar() {
    if (mobileSidebar) mobileSidebar.classList.add('active');
    if (sidebarOverlay) sidebarOverlay.classList.add('active');
    if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // 禁止背景捲動
  }

  function closeSidebar() {
    if (mobileSidebar) mobileSidebar.classList.remove('active');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openSidebar);
  if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
}

// 註冊 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(reg => {
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
  }).catch(error => console.error('SW 註冊失敗:', error));
}

function showUpdateToast() {
  showToast('發現新版本，點擊此處重新整理');
  const toast = document.getElementById('toast-notification');
  if (toast) {
    toast.onclick = () => window.location.reload();
  }
}

/**
 * 綁定所有事件處理器
 */
function attachEventHandlers() {
  initScrollToTop();
  prefetchLinks();
  initSmartHeader();
  initShareButton();
  initInstallPrompt();
  initOfflinePage();
  initMobileSidebar();
  initThemeToggle();
  loadNonCriticalStyles();
  initPushNotification();
}

/**
 * 初始化 Web Push 通知
 */
function initPushNotification() {
  const btn = document.getElementById('push-subscribe');
  if (!btn) return;

  // 檢查是否已訂閱或不支援
  if (checkPermission() === 'denied') {
    btn.textContent = '通知已封鎖';
    btn.disabled = true;
    return;
  }

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    btn.textContent = '訂閱中...';
    try {
      await requestPermission();
      const success = await subscribeToPush();
      if (success) {
        showToast('訂閱成功！您將收到最新應用程式更新通知。');
        btn.textContent = '已訂閱通知';
      } else {
        showToast('訂閱失敗，請稍後再試。', 'error');
        btn.textContent = '訂閱通知';
        btn.disabled = false;
      }
    } catch (error) {
      // console.warn('使用者拒絕或發生錯誤', error);
      showToast('訂閱失敗: ' + error.message, 'error');
      btn.textContent = '訂閱通知';
      btn.disabled = false;
    }
  });
}

/**
 * 載入非關鍵 CSS (避免 CSP inline script 違規)
 */
function loadNonCriticalStyles() {
  const links = document.querySelectorAll('link[rel="stylesheet"][media="print"]');
  links.forEach(link => {
    link.media = 'all';
  });
}

/**
 * 主程式進入點 (Main Entry Point)
 */
document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadComponent(CONFIG.PATHS.HEADER, 'header-placeholder'),
    loadComponent(CONFIG.PATHS.FOOTER, 'footer-placeholder'),
    loadComponent(CONFIG.PATHS.COOKIE, 'cookie-placeholder')
  ]);

  // 初始化 i18n
  await i18n.init();

  attachEventHandlers();
  checkForAppUpdates();
});

// 處理瀏覽器上一頁/下一頁按鈕 (BFcache)
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    if (mobileSidebar) mobileSidebar.classList.remove('active');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});
