import { auth } from './firebase-config.js';
import { getTranslation, setLanguage, applyTranslations } from './lang.js';
import { showLoader, hideLoader, showAuthView, showDashboardView, showVerificationWarning, toggleAuthForms } from './ui.js';
import { registerUser, loginUser, sendVerificationEmailToUser, logoutUser, refreshUserVerificationStatus } from './auth-service.js';

// DOM Elements
const authContainer = document.querySelector('.auth-container');
const signInButton = document.getElementById('signIn');
const signUpButton = document.getElementById('signUp');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const langToggleAuthBtn = document.getElementById('langToggleAuth');

const btnResend = document.getElementById('btn-resend');
const btnReload = document.getElementById('btn-reload');
const btnLogoutVerify = document.getElementById('btn-logout-verify');
const dashboardLogoutBtn = document.getElementById('temp-logout'); // এখানে নামকরণ পরিবর্তন করা হয়েছে

// ১. অ্যাপ শুরু করা এবং লোডার দেখানো
showLoader();

// ২. অথেনটিকেশন স্টেট লিসেনার
firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    console.log("User logged in:", user.email);
    if (user.emailVerified) {
      // ইমেইল ভেরিফাইড হলে ড্যাশবোর্ড দেখাও
      showDashboardView();
    } else {
      // ইমেইল ভেরিফাইড না হলে ভেরিফিকেশন ওয়ার্নিং দেখাও
      showVerificationWarning();
      console.log("Email not verified. Showing verification warning.");
      // যদি ইউজার পেজ রিলোড করার পর এখানে আসে, নিশ্চিত করার জন্য একবার ভেরিফিকেশন মেইল পাঠাও
      // এটি অতিরিক্ত ইমেইল পাঠানো এড়ানোর জন্য একটি কুলডাউন পিরিয়ড সহ করা উচিত
      // আপাতত, সরাসরি পাঠাচ্ছি না, ইউজারকে 'Resend Email' ক্লিক করতে দেব।
    }
  } else {
    // ইউজার লগইন নেই, Auth ভিউ দেখাও
    console.log("No user logged in. Showing auth view.");
    showAuthView();
  }
  hideLoader(); // Auth স্টেট চেক হওয়ার পর লোডার পুরোপুরি সরবে
  applyTranslations(); // ভাষা আপডেট করো
});

// ৩. লগইন/সাইনআপ ফর্মের স্লাইডিং অ্যানিমেশন
signInButton.addEventListener('click', () => toggleAuthForms(false));
signUpButton.addEventListener('click', () => toggleAuthForms(true));

// ৪. সাইন আপ ফর্ম সাবমিট
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('reg-email').value;
  const pass = document.getElementById('reg-pass').value;
  const name = document.getElementById('reg-name').value;
  
  try {
    const user = await registerUser(email, pass, name);
    await sendVerificationEmailToUser(user);
    alert(getTranslation('signupSuccess'));
    console.log("Signup successful, verification email sent.");
    await logoutUser(); // সাইন আপ এর পর লগআউট করে ভেরিফিকেশন স্ক্রিনে রাখতে
    // onAuthStateChanged লিসেনারটি এরপর ভেরিফিকেশন স্ক্রিন দেখাবে
  } catch (error) {
    alert(`${getTranslation('signupError')} ${error.message}`);
    console.error("Signup error:", error);
  }
});

// ৫. লগইন ফর্ম সাবমিট
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-pass').value;
  
  try {
    await loginUser(email, pass);
    console.log("Login successful.");
    // onAuthStateChanged অটোমেটিকভাবে UI আপডেট করবে
  } catch (error) {
    alert(`${getTranslation('loginError')} ${error.message}`);
    console.error("Login error:", error);
  }
});

// ৬. ভেরিফিকেশন স্ক্রিনের বাটন লজিক
btnResend.addEventListener('click', async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      await sendVerificationEmailToUser(user);
      alert(`${getTranslation('resendError')} ${getTranslation('spamAlert')}`);
      console.log("Verification email re-sent.");
    } catch (error) {
      alert(`${getTranslation('resendError')} ${error.message}`);
      console.error("Resend email error:", error);
    }
  }
});

btnReload.addEventListener('click', async () => {
  // Firebase থেকে ইউজারের সর্বশেষ স্টেট লোড করে, তারপর onAuthStateChanged রান করবে
  const isVerified = await refreshUserVerificationStatus();
  if (isVerified) {
    showDashboardView(); // সরাসরি ড্যাশবোর্ডে নিয়ে যাও যদি ভেরিফাই হয়ে যায়
  } else {
    alert(getTranslation('emailVerificationNeeded'));
  }
  console.log("User attempted to verify. Status:", isVerified);
});

btnLogoutVerify.addEventListener('click', async () => {
  try {
    await logoutUser();
    console.log("Logged out from verification screen.");
  } catch (error) {
    alert(`${getTranslation('logoutError')} ${error.message}`);
    console.error("Logout error:", error);
  }
});

// ৭. ড্যাশবোর্ড থেকে লগআউট (টেস্ট বাটন)
if (dashboardLogoutBtn) { // নিশ্চিত করা যে বাটনটা আছে
  dashboardLogoutBtn.addEventListener('click', async () => {
    try {
      await logoutUser();
      console.log("Logged out from dashboard.");
    } catch (error) {
      alert(`${getTranslation('logoutError')} ${error.message}`);
      console.error("Logout error:", error);
    }
  });
}

// ৮. ভাষা টগল বাটন
langToggleAuthBtn.addEventListener('click', () => {
  const current = localStorage.getItem('expensify-lang') || 'bn';
  const newLang = (current === 'bn') ? 'en' : 'bn';
  setLanguage(newLang);
});

// ৯. প্রথমবার অ্যাপ লোড হলে ভাষা সেট করা
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('expensify-lang');
  if (savedLang) {
    setLanguage(savedLang);
  } else {
    setLanguage('bn'); // ডিফল্ট বাংলা
  }
});