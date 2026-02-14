const translations = {
  en: {
    welcomeTitle: "Welcome!",
    welcomeDesc: "Login to your account to continue.",
    helloTitle: "New User?",
    helloDesc: "Register in a few steps to start your financial journey.",
    signInBtn: "Sign In",
    signUpBtn: "Sign Up",
    loginTitle: "Login",
    signupTitle: "Sign Up",
    orUseEmail: "or use email",
    forgotPass: "Forgot password?",
    loginAction: "Login",
    signupAction: "Create Account",
    fullName: "Your Full Name",
    email: "Email",
    password: "Password (6+ chars)",
    authSubtitleDefault: "Your daily expense companion",
    authSubtitleSignup: "Create a new account",
    emailVerificationNeeded: "Email Verification Needed",
    verificationDesc: "We have sent a verification link to your email. Please check your inbox.",
    spamAlert: "If you don't receive the email, please check your Spam or Junk folder.",
    resendEmail: "Resend Email",
    iHaveVerified: "I Have Verified",
    logout: "Log Out",
    signupSuccess: "Account created! Please check your email (including Spam folder) for verification.",
    signupError: "Signup Error:",
    loginError: "Login Error:",
    resendError: "Failed to resend email:",
    logoutError: "Failed to log out:",
    appLoadError: "Error loading app:",
    dashboardLoading: "Dashboard Loading...",
    logoutTest: "Logout (Test)"
  },
  bn: {
    welcomeTitle: "স্বাগতম!",
    welcomeDesc: "আপনার অ্যাকাউন্টে লগইন করতে ইমেইল এবং পাসওয়ার্ড দিন।",
    helloTitle: "নতুন ইউজার?",
    helloDesc: "মাত্র কয়েক ধাপে একটি অ্যাকাউন্ট খুলে আপনার আর্থিক যাত্রা শুরু করুন।",
    signInBtn: "লগইন",
    signUpBtn: "সাইন আপ",
    loginTitle: "লগইন",
    signupTitle: "সাইন আপ",
    orUseEmail: "অথবা ইমেইল ব্যবহার করুন",
    forgotPass: "পাসওয়ার্ড ভুলে গেছেন?",
    loginAction: "লগইন করুন",
    signupAction: "অ্যাকাউন্ট খুলুন",
    fullName: "আপনার পুরো নাম",
    email: "ইমেইল",
    password: "পাসওয়ার্ড (৬+ অক্ষর)",
    authSubtitleDefault: "আপনার দৈনন্দিন হিসাবের সঙ্গী",
    authSubtitleSignup: "নতুন অ্যাকাউন্ট খুলুন",
    emailVerificationNeeded: "ইমেইল ভেরিফিকেশন প্রয়োজন",
    verificationDesc: "আমরা আপনার ইমেইলে একটি ভেরিফিকেশন লিংক পাঠিয়েছি। দয়া করে আপনার ইনবক্স চেক করুন।",
    spamAlert: "মেইল না পেলে অবশ্যই Spam বা Junk ফোল্ডার চেক করুন।",
    resendEmail: "পুনরায় ইমেইল পাঠান",
    iHaveVerified: "আমি ভেরিফাই করেছি",
    logout: "লগ আউট",
    signupSuccess: "অ্যাকাউন্ট খোলা হয়েছে! আপনার ইমেইল চেক করুন (Spam ফোল্ডারসহ) ভেরিফিকেশনের জন্য।",
    signupError: "সাইন আপ ভুল:",
    loginError: "লগইন ভুল:",
    resendError: "ইমেইল পাঠাতে ভুল হয়েছে:",
    logoutError: "লগ আউট করতে ভুল হয়েছে:",
    appLoadError: "অ্যাপ লোড করতে ভুল হয়েছে:",
    dashboardLoading: "ড্যাশবোর্ড লোড হচ্ছে...",
    logoutTest: "লগ আউট (টেস্ট)"
  }
};

let currentLang = 'bn'; // ডিফল্ট ভাষা বাংলা

// ভাষার উপর ভিত্তি করে টেক্সট রিটার্ন করার ফাংশন
export function getTranslation(key) {
  return translations[currentLang][key] || key;
}

// ভাষা পরিবর্তন করার ফাংশন
export function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    localStorage.setItem('expensify-lang', lang); // লোকাল স্টোরেজে সেভ করা
    applyTranslations(); // UI তে পরিবর্তন প্রয়োগ করা
  }
}

// UI এর সমস্ত টেক্সট আপডেট করার ফাংশন (এই ফাংশন app.js থেকে কল হবে)
export function applyTranslations() {
  // এখানে আপনার প্রতিটি টেক্সট এলিমেন্টের ID ধরে ধরে innerText আপডেট করতে হবে
  document.getElementById('auth-subtitle') && (document.getElementById('auth-subtitle').innerText = getTranslation('authSubtitleDefault'));
  document.getElementById('overlay-welcome-title') && (document.getElementById('overlay-welcome-title').innerText = getTranslation('welcomeTitle'));
  document.getElementById('overlay-welcome-desc') && (document.getElementById('overlay-welcome-desc').innerText = getTranslation('welcomeDesc'));
  document.getElementById('signIn') && (document.getElementById('signIn').innerText = getTranslation('signInBtn'));
  document.getElementById('overlay-hello-title') && (document.getElementById('overlay-hello-title').innerText = getTranslation('helloTitle'));
  document.getElementById('overlay-hello-desc') && (document.getElementById('overlay-hello-desc').innerText = getTranslation('helloDesc'));
  document.getElementById('signUp') && (document.getElementById('signUp').innerText = getTranslation('signUpBtn'));
  document.querySelector('.form-container.sign-in-container .form-title') && (document.querySelector('.form-container.sign-in-container .form-title').innerText = getTranslation('loginTitle'));
  document.querySelector('.form-container.sign-up-container .form-title') && (document.querySelector('.form-container.sign-up-container .form-title').innerText = getTranslation('signupTitle'));
  document.querySelector('.sign-in-container .or-separator') && (document.querySelector('.sign-in-container .or-separator').innerText = getTranslation('orUseEmail'));
  document.querySelector('.sign-up-container .or-separator') && (document.querySelector('.sign-up-container .or-separator').innerText = getTranslation('orUseEmail'));
  document.querySelector('.forgot-pass-link') && (document.querySelector('.forgot-pass-link').innerText = getTranslation('forgotPass'));
  document.querySelector('#login-form .btn-action') && (document.querySelector('#login-form .btn-action').innerText = getTranslation('loginAction'));
  document.querySelector('#signup-form .btn-action') && (document.querySelector('#signup-form .btn-action').innerText = getTranslation('signupAction'));
  document.getElementById('reg-name') && (document.getElementById('reg-name').placeholder = getTranslation('fullName'));
  document.getElementById('login-email') && (document.getElementById('login-email').placeholder = getTranslation('email'));
  document.getElementById('reg-email') && (document.getElementById('reg-email').placeholder = getTranslation('email'));
  document.getElementById('login-pass') && (document.getElementById('login-pass').placeholder = getTranslation('password'));
  document.getElementById('reg-pass') && (document.getElementById('reg-pass').placeholder = getTranslation('password'));
  
  // Verification screen texts
  document.getElementById('verify-title') && (document.getElementById('verify-title').innerText = getTranslation('emailVerificationNeeded'));
  document.getElementById('verify-desc') && (document.getElementById('verify-desc').innerText = getTranslation('verificationDesc'));
  document.getElementById('spam-text') && (document.getElementById('spam-text').innerHTML = getTranslation('spamAlert'));
  document.getElementById('btn-resend') && (document.getElementById('btn-resend').innerText = getTranslation('resendEmail'));
  document.getElementById('btn-reload') && (document.getElementById('btn-reload').innerText = getTranslation('iHaveVerified'));
  document.getElementById('btn-logout-verify') && (document.getElementById('btn-logout-verify').innerText = getTranslation('logout'));
  document.getElementById('temp-logout') && (document.getElementById('temp-logout').innerText = getTranslation('logoutTest'));
  
  
  // ভাষা টগল বাটন আপডেট
  const langToggleBtn = document.getElementById('langToggleAuth');
  if (langToggleBtn) {
    if (currentLang === 'en') {
      langToggleBtn.innerText = '🇧🇩 BN';
      document.body.classList.remove('bangla-mode');
    } else {
      langToggleBtn.innerText = '🇬🇧 EN';
      document.body.classList.add('bangla-mode');
    }
  }
}

// অ্যাপ লোড হওয়ার সাথে সাথে ডিফল্ট ভাষা সেট করা
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('expensify-lang');
  if (savedLang) {
    setLanguage(savedLang);
  } else {
    applyTranslations(); // প্রথমবার লোড হলে ডিফল্ট বাংলা টেক্সট দেখাবে
  }
});