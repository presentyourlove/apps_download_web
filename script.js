// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Tab Navigation
const navTabs = document.querySelectorAll('.nav-tab');
const sidebarTabs = document.querySelectorAll('.sidebar-tab');
const tabContents = document.querySelectorAll('.tab-content');

// Mobile Sidebar
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileSidebar = document.getElementById('mobile-sidebar');
const sidebarClose = document.getElementById('sidebar-close');
const sidebarOverlay = document.getElementById('sidebar-overlay');

// Function to switch tabs
function switchTab(tabName) {
  // Hide all tab contents
  tabContents.forEach(content => {
    content.classList.remove('active');
  });

  // Remove active class from all nav tabs
  navTabs.forEach(tab => {
    tab.classList.remove('active');
  });
  sidebarTabs.forEach(tab => {
    tab.classList.remove('active');
  });

  // Show selected tab content
  const selectedContent = document.getElementById(`tab-${tabName}`);
  if (selectedContent) {
    selectedContent.classList.add('active');
  }

  // Add active class to clicked tab
  document.querySelectorAll(`[data-tab="${tabName}"]`).forEach(tab => {
    tab.classList.add('active');
  });

  // Update URL hash
  window.location.hash = tabName;

  // Close mobile sidebar if open
  closeSidebar();
}

// Desktop nav tab click handlers
navTabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    const tabName = tab.getAttribute('data-tab');
    switchTab(tabName);
  });
});

// Sidebar tab click handlers
sidebarTabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    const tabName = tab.getAttribute('data-tab');
    switchTab(tabName);
  });
});

// App card click handlers
document.addEventListener('click', (e) => {
  const appCard = e.target.closest('.app-card');
  if (appCard) {
    e.preventDefault();
    const tabName = appCard.getAttribute('data-tab');
    if (tabName) {
      switchTab(tabName);
    }
  }
});

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

// Handle initial hash on page load
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.substring(1);
  if (hash && (hash === 'home' || hash === 'financeapp')) {
    switchTab(hash);
  } else {
    switchTab('home');
  }
});

// Handle browser back/forward buttons
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.substring(1);
  if (hash && (hash === 'home' || hash === 'financeapp')) {
    switchTab(hash);
  }
});
