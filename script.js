// Component Loader
async function loadComponent(componentPath, placeholderId) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
    const html = await response.text();
    document.getElementById(placeholderId).innerHTML = html;
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

// Initialize theme
function initTheme() {
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
}

// Theme toggle handler (will be attached after components load)
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

// Tab Navigation (will be initialized after components load)
let navTabs, sidebarTabs, tabContents;
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
    }
  };

  navTabs.forEach(setActive);
  sidebarTabs.forEach(setActive);
}

// App card click handlers
// App card click handlers (Removed as they are simple links now)

// Mobile sidebar functions
function openSidebar() {
  mobileSidebar.classList.add('active');
  sidebarOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  mobileSidebar.classList.remove('active');
  sidebarOverlay.classList.remove('active');
  document.body.style.overflow = '';
}


// Initialize all components and event handlers
// Initialize all components and event handlers
window.addEventListener('DOMContentLoaded', async () => {
  // Load components first
  await loadComponent('components/header.html', 'header-placeholder');
  await loadComponent('components/footer.html', 'footer-placeholder');

  // Initialize theme
  initTheme();

  // Initialize theme toggle
  initThemeToggle();

  // Initialize DOM references
  navTabs = document.querySelectorAll('.nav-tab');
  sidebarTabs = document.querySelectorAll('.sidebar-tab');
  mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  mobileSidebar = document.getElementById('mobile-sidebar');
  sidebarClose = document.getElementById('sidebar-close');
  sidebarOverlay = document.getElementById('sidebar-overlay');

  // Set active navigation
  setActiveNav();

  // Attach event handlers
  attachEventHandlers();
});

// Attach all event handlers
function attachEventHandlers() {
  // Desktop nav tab click handlers
  // No longer need to intercept nav clicks for tab switching
  // Links will work natively

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

// Handle browser back/forward buttons
// Browser back/forward handled natively by browser
