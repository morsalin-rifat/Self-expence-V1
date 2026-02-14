// UI এর DOM এলিমেন্টগুলো ধরা
const loader = document.getElementById('app-loader');
const authView = document.getElementById('auth-view');
const dashboardView = document.getElementById('dashboard-view');
const authContainer = document.querySelector('.auth-container'); // স্লাইডিং এর জন্য
const verificationWarning = document.getElementById('verification-warning');
const formPanelWrapper = document.querySelector('.form-panel-wrapper');

// লোডার দেখানো
export function showLoader() {
  if (loader) loader.classList.remove('hidden');
}

// লোডার লুকানো
export function hideLoader() {
  if (loader) loader.classList.add('hidden');
}

// অথেনটিকেশন ভিউ দেখানো (লগইন/সাইনআপ)
export function showAuthView(showSignupForm = false) {
  authView.classList.remove('hidden');
  dashboardView.classList.add('hidden');
  verificationWarning.classList.add('hidden');
  formPanelWrapper.classList.remove('hidden'); // ফর্ম প্যানেল দেখাও
  
  if (showSignupForm) {
    authContainer.classList.add('right-panel-active');
  } else {
    authContainer.classList.remove('right-panel-active');
  }
}

// ড্যাশবোর্ড ভিউ দেখানো
export function showDashboardView() {
  authView.classList.add('hidden');
  dashboardView.classList.remove('hidden');
  verificationWarning.classList.add('hidden');
  formPanelWrapper.classList.add('hidden'); // ফর্ম প্যানেল হাইড করো
}

// ভেরিফিকেশন ওয়ার্নিং দেখানো
export function showVerificationWarning() {
  authView.classList.remove('hidden');
  dashboardView.classList.add('hidden');
  formPanelWrapper.classList.add('hidden'); // ফর্ম প্যানেল হাইড করো
  verificationWarning.classList.remove('hidden');
}

// লগইন/সাইনআপ ফর্মের স্লাইডিং টগল (ভিডিওর মতো)
export function toggleAuthForms(toSignup) {
  if (toSignup) {
    authContainer.classList.add("right-panel-active");
  } else {
    authContainer.classList.remove("right-panel-active");
  }
}