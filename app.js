// Firebase কনফিগারেশন
const firebaseConfig = {
    apiKey: "AIzaSyCLxjV6QYFldtIH1HAXiz-cxa22veVp-kU",
    authDomain: "expensetrackerpwa-6b23f.firebaseapp.com",
    projectId: "expensetrackerpwa-6b23f",
    storageBucket: "expensetrackerpwa-6b23f.firebasestorage.app",
    messagingSenderId: "542779197190",
    appId: "1:542779197190:web:3abb3eacef3af93c7ac087",
    measurementId: "G-4TSKLVWSXS"
};

// অ্যাপ ইনিশিয়লাইজ করার চেষ্টা, এরর হ্যান্ডলিং সহ
try {
    const app = firebase.initializeApp(firebaseConfig);
    const auth = app.auth(); // Firebase Auth সার্ভিস
    const db = app.firestore(); // Firebase Firestore সার্ভিস

    console.log("Firebase initialized successfully.");

    // ================== DOM ELEMENTS ==================
    const loader = document.getElementById('app-loader');
    const authView = document.getElementById('auth-view');
    const dashboardView = document.getElementById('dashboard-view');

    // Auth Form Elements for Sliding Animation
    const authContainer = document.querySelector('.auth-container');
    const signInButton = document.getElementById('signIn');
    const signUpButton = document.getElementById('signUp');

    // Auth Forms
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    // Verification Warning Box
    const verificationWarning = document.getElementById('verification-warning');
    const btnResend = document.getElementById('btn-resend');
    const btnReload = document.getElementById('btn-reload');
    const btnLogoutVerify = document.getElementById('btn-logout-verify');

    // Dashboard Logout Button
    const dashboardLogoutBtn = document.getElementById('temp-logout'); // এখানে নামকরণ পরিবর্তন করা হয়েছে

    // Language Toggle Button
    const langToggleAuthBtn = document.getElementById('langToggleAuth');


    // ================== LANGUAGE SUPPORT (Directly in app.js) ==================
    const translations = {
        en: {
            welcomeTitle: "Welcome!", welcomeDesc: "Login to your account to continue.",
            helloTitle: "New User?", helloDesc: "Register in a few steps to start your financial journey.",
            signInBtn: "Sign In", signUpBtn: "Sign Up",
            loginTitle: "Login", signupTitle: "Sign Up",
            orUseEmail: "or use email", forgotPass: "Forgot password?",
            loginAction: "Login", signupAction: "Create Account",
            fullName: "Your Full Name", email: "Email", password: "Password (Min 6 chars)",
            emailVerificationNeeded: "Email Verification Needed",
            verificationDesc: "We have sent a verification link to your email. Please check your inbox.",
            spamAlert: "If you don't receive the email, please check your <strong>Spam</strong> or <strong>Junk</strong> folder.",
            resendEmail: "Resend Email", iHaveVerified: "I Have Verified", logout: "Log Out",
            signupSuccess: "Account created! Please check your email (including Spam folder) for verification.",
            signupError: "Signup Error:", loginError: "Login Error:",
            resendError: "Failed to resend email:", logoutError: "Failed to log out:",
            dashboardLoading: "Dashboard Loading...", logoutTest: "Logout (Test)"
        },
        bn: {
            welcomeTitle: "স্বাগতম!", welcomeDesc: "আপনার অ্যাকাউন্টে লগইন করতে ইমেইল এবং পাসওয়ার্ড দিন।",
            helloTitle: "নতুন ইউজার?", helloDesc: "মাত্র কয়েক ধাপে একটি অ্যাকাউন্ট খুলে আপনার আর্থিক যাত্রা শুরু করুন।",
            signInBtn: "লগইন", signUpBtn: "সাইন আপ",
            loginTitle: "লগইন", signupTitle: "সাইন আপ",
            orUseEmail: "অথবা ইমেইল ব্যবহার করুন", forgotPass: "পাসওয়ার্ড ভুলে গেছেন?",
            loginAction: "লগইন করুন", signupAction: "অ্যাকাউন্ট খুলুন",
            fullName: "আপনার পুরো নাম", email: "ইমেইল", password: "পাসওয়ার্ড (৬+ অক্ষর)",
            emailVerificationNeeded: "ইমেইল ভেরিফিকেশন প্রয়োজন",
            verificationDesc: "আমরা আপনার ইমেইলে একটি ভেরিফিকেশন লিংক পাঠিয়েছি। দয়া করে আপনার ইনবক্স চেক করুন।",
            spamAlert: "মেইল না পেলে অবশ্যই <strong>Spam</strong> বা <strong>Junk</strong> ফোল্ডার চেক করুন।",
            resendEmail: "পুনরায় ইমেইল পাঠান", iHaveVerified: "আমি ভেরিফাই করেছি", logout: "লগ আউট",
            signupSuccess: "অ্যাকাউন্ট খোলা হয়েছে! আপনার ইমেইল চেক করুন (Spam ফোল্ডারসহ) ভেরিফিকেশনের জন্য।",
            signupError: "সাইন আপ ভুল:", loginError: "লগইন ভুল:",
            resendError: "ইমেইল পাঠাতে ভুল হয়েছে:", logoutError: "লগ আউট করতে ভুল হয়েছে:",
            dashboardLoading: "ড্যাশবোর্ড লোড হচ্ছে...", logoutTest: "লগ আউট (টেস্ট)"
        }
    };
    let currentLang = 'bn'; // ডিফল্ট ভাষা বাংলা

    function getTranslation(key) {
        return translations[currentLang][key] || key;
    }

    function applyTranslations() {
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
        if (langToggleAuthBtn) {
            if (currentLang === 'en') {
                langToggleAuthBtn.innerText = '🇧🇩 BN';
                document.body.classList.remove('bangla-mode');
            } else {
                langToggleBtn.innerText = '🇬🇧 EN';
                document.body.classList.add('bangla-mode');
            }
        }
    }

    function setLanguage(lang) {
        if (translations[lang]) {
            currentLang = lang;
            localStorage.setItem('expensify-lang', lang); // লোকাল স্টোরেজে সেভ করা
            applyTranslations(); // UI তে পরিবর্তন প্রয়োগ করা
        }
    }


    // ================== UI CONTROL (Directly in app.js) ==================
    function showLoader() {
        if (loader) loader.classList.remove('hidden');
    }

    function hideLoader() {
        if (loader) loader.classList.add('hidden');
    }

    function showAuthView(showSignupForm = false) {
        authView.classList.remove('hidden');
        dashboardView.classList.add('hidden');
        verificationWarning.classList.add('hidden');
        document.querySelector('.form-panel-wrapper').classList.remove('hidden'); // ফর্ম প্যানেল দেখাও

        if (showSignupForm) {
            authContainer.classList.add('right-panel-active');
        } else {
            authContainer.classList.remove('right-panel-active');
        }
    }

    function showDashboardView() {
        authView.classList.add('hidden');
        dashboardView.classList.remove('hidden');
        verificationWarning.classList.add('hidden');
        document.querySelector('.form-panel-wrapper').classList.add('hidden'); // ফর্ম প্যানেল হাইড করো
    }

    function showVerificationWarning() {
        authView.classList.remove('hidden');
        dashboardView.classList.add('hidden');
        document.querySelector('.form-panel-wrapper').classList.add('hidden'); // ফর্ম প্যানেল হাইড করো
        verificationWarning.classList.remove('hidden');
    }

    function toggleAuthForms(toSignup) {
        if (toSignup) {
            authContainer.classList.add("right-panel-active");
        } else {
            authContainer.classList.remove("right-panel-active");
        }
    }

    // ================== AUTH SERVICE (Directly in app.js) ==================
    async function registerUser(email, password, name) {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            await userCredential.user.updateProfile({ displayName: name });
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    }

    async function loginUser(email, password) {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    }

    async function sendVerificationEmailToUser(user) {
        try {
            await user.sendEmailVerification();
        } catch (error) {
            throw error;
        }
    }

    async function logoutUser() {
        try {
            await auth.signOut();
        } catch (error) {
            throw error;
        }
    }

    async function refreshUserVerificationStatus() {
        const user = auth.currentUser;
        if (user) {
            await user.reload(); // Firebase থেকে ইউজারের সর্বশেষ ডেটা লোড করা
            return auth.currentUser.emailVerified;
        }
        return false;
    }


    // ================== MAIN APP LOGIC ==================

    // ১. অ্যাপ শুরু করা এবং লোডার দেখানো
    showLoader();

    // ২. অথেনটিকেশন স্টেট লিসেনার
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            console.log("User logged in:", user.email);
            if (user.emailVerified) {
                // ইমেইল ভেরিফাইড হলে ড্যাশবোর্ড দেখাও
                showDashboardView();
            } else {
                // ইমেইল ভেরিফাইড না হলে ভেরিফিকেশন ওয়ার্নিং দেখাও
                showVerificationWarning();
                console.log("Email not verified. Showing verification warning.");
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
                alert(`${getTranslation('resendEmail')} ${getTranslation('spamAlert')}`);
                console.log("Verification email re-sent.");
            } catch (error) {
                alert(`${getTranslation('resendError')} ${error.message}`);
                console.error("Resend email error:", error);
            }
        }
    });

    btnReload.addEventListener('click', async () => {
        const isVerified = await refreshUserVerificationStatus();
        if (isVerified) {
            showDashboardView();
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
    if (dashboardLogoutBtn) {
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

} catch (error) {
    // যদি Firebase ইনিশিয়লাইজেশনে বা অন্য কোনো প্রাথমিক ভুল হয়
    alert("অ্যাপ লোড করতে ভুল হয়েছে: " + error.message + "\nআপনার ইন্টারনেট কানেকশন এবং কনফিগারেশন চেক করুন।");
    console.error("App initialization error:", error);
    // লোডার সরাও, যাতে অন্তত এরর মেসেজ দেখা যায়
    document.getElementById('app-loader').classList.add('hidden');
}