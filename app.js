// app.js

// Global Translations Data
const translations = {
  en: {
    // AuthForm
    welcome: "Welcome Back",
    createAccount: "Create Account",
    loginSubtitle: "Enter your details to login",
    signupSubtitle: "Start tracking your expenses today",
    namePlaceholder: "Full Name",
    emailPlaceholder: "Email Address",
    passPlaceholder: "Password",
    loginBtn: "Login",
    signupBtn: "Sign Up",
    wait: "Please wait...",
    haveAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    switchLogin: "Login here",
    switchSignup: "Register here",
    verificationSent: "Verification email sent! Please check your inbox (and spam folder).",
    emailVerificationNeeded: "Email Verification Required",
    hello: "Hello,",
    verifyEmailSubtitle: "To secure your account, please verify your email address.",
    checkSpam: "We've sent a link to {email}. If you don't see it, please check your <b>Spam</b> or <b>Junk</b> folder.",
    resendLink: "Resend Verification Link",
    verifiedRefresh: "I have verified (Refresh)",
    loginWithOther: "Login with another account",
    errorPass: "Wrong password.",
    errorUser: "No account found with this email.",
    errorEmail: "This email is already in use.",
    errorGeneric: "An unexpected error occurred.",
    appLoading: "App is loading...",

    // Dashboard
    dashboardTitle: "Dashboard",
    totalBalance: "Total Balance",
    monthlyIncome: "Monthly Income",
    monthlyExpense: "Monthly Expense",
    remainingBudget: "Remaining Budget",
    recentTransactions: "Recent Transactions",
    spendingBreakdown: "Spending Breakdown",
    loadingChart: "Loading chart...",
    food: "Food",
    transport: "Transport",
    salary: "Salary",
    bills: "Bills",
    groceries: "Groceries",

    // Sidebar
    dashboard: "Dashboard",
    transactions: "Transactions",
    reports: "Reports",
    categories: "Categories",
    settings: "Settings",
    logout: "Logout",
  },
  bn: {
    // AuthForm
    welcome: "স্বাগতম",
    createAccount: "অ্যাকাউন্ট খুলুন",
    loginSubtitle: "লগইন করতে আপনার তথ্য দিন",
    signupSubtitle: "আজই খরচ ট্র্যাক করা শুরু করুন",
    namePlaceholder: "আপনার নাম",
    emailPlaceholder: "ইমেইল অ্যাড্রেস",
    passPlaceholder: "পাসওয়ার্ড",
    loginBtn: "লগইন",
    signupBtn: "রেজিস্ট্রেশন",
    wait: "অপেক্ষা করুন...",
    haveAccount: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
    noAccount: "অ্যাকাউন্ট নেই?",
    switchLogin: "লগইন করুন",
    switchSignup: "রেজিস্ট্রেশন করুন",
    verificationSent: "ভেরিফিকেশন ইমেইল পাঠানো হয়েছে! দয়া করে আপনার ইনবক্স (এবং স্প্যাম ফোল্ডার) চেক করুন।",
    emailVerificationNeeded: "ইমেইল ভেরিফিকেশন প্রয়োজন",
    hello: "হ্যালো,",
    verifyEmailSubtitle: "আপনার অ্যাকাউন্ট সুরক্ষিত রাখতে, আপনার ইমেইল অ্যাড্রেস ভেরিফাই করুন।",
    checkSpam: "আমরা <b>{email}</b> ঠিকানায় একটি লিংক পাঠিয়েছি। এটি ইনবক্সে না পেলে দয়া করে <b>Spam</b> বা <b>Junk</b> ফোল্ডার চেক করুন।",
    resendLink: "ভেরিফিকেশন লিংক আবার পাঠান",
    verifiedRefresh: "আমি ভেরিফাই করেছি (রিফ্রেশ করুন)",
    loginWithOther: "অন্য অ্যাকাউন্ট দিয়ে লগইন করুন",
    errorPass: "পাসওয়ার্ড ভুল হয়েছে।",
    errorUser: "এই ইমেইলে কোনো অ্যাকাউন্ট নেই।",
    errorEmail: "এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট খোলা আছে।",
    errorGeneric: "একটি অপ্রত্যাশিত ত্রুটি হয়েছে।",
    appLoading: "অ্যাপ লোড হচ্ছে...",

    // Dashboard
    dashboardTitle: "ড্যাশবোর্ড",
    totalBalance: "মোট ব্যালেন্স",
    monthlyIncome: "মাসিক আয়",
    monthlyExpense: "মাসিক খরচ",
    remainingBudget: "বাকি বাজেট",
    recentTransactions: "সাম্প্রতিক লেনদেন",
    spendingBreakdown: "খরচের বিশ্লেষণ",
    loadingChart: "চার্ট লোড হচ্ছে...",
    food: "খাবার",
    transport: "যাতায়াত",
    salary: "বেতন",
    bills: "বিল",
    groceries: "বাজার",
    
    // Sidebar
    dashboard: "ড্যাশবোর্ড",
    transactions: "লেনদেন",
    reports: "রিপোর্ট",
    categories: "ক্যাটাগরি",
    settings: "সেটিংস",
    logout: "লগআউট",
  }
};

// Global State Management (Vanilla JS style)
let currentUser = null;
let appLanguage = localStorage.getItem('appLang') || 'bn'; // Load language from local storage
let isSidebarOpen = false;
let currentPage = 'dashboard'; // 'dashboard', 'settings', etc.

// Helper function to get translated text
function getTranslation(key) {
    return translations[appLanguage][key] || key;
}

// Function to render the AuthForm
function renderAuthForm() {
    const t = translations[appLanguage];

    // Create the main card element
    const authCard = document.createElement('div');
    authCard.className = 'auth-container fade-in';
    authCard.innerHTML = `
        <div class="auth-card">
            <button class="lang-toggle">${appLanguage === "bn" ? "English" : "বাংলা"}</button>
            <h2>${t.isLogin ? t.welcome : t.createAccount}</h2>
            <p style="margin-bottom: 25px;">${t.isLogin ? t.loginSubtitle : t.signupSubtitle}</p>
            <div id="auth-message-area"></div>
            <form id="auth-form">
                ${!t.isLogin ? `
                    <div class="input-group fade-in">
                        <input type="text" class="input-field" id="auth-name" placeholder="${t.namePlaceholder}" required />
                    </div>
                ` : ''}
                <div class="input-group">
                    <input type="email" class="input-field" id="auth-email" placeholder="${t.emailPlaceholder}" required />
                </div>
                <div class="input-group">
                    <input type="password" class="input-field" id="auth-password" placeholder="${t.passPlaceholder}" required />
                </div>
                <button type="submit" class="submit-btn" id="auth-submit-btn">${t.isLogin ? t.loginBtn : t.signupBtn}</button>
            </form>
            <div class="toggle-text">
                ${t.isLogin ? t.noAccount : t.haveAccount}
                <span class="toggle-link" id="auth-toggle-link">
                    ${t.isLogin ? t.switchSignup : t.switchLogin}
                </span>
            </div>
        </div>
    `;
    
    const appRoot = document.getElementById('app-root');
    appRoot.innerHTML = ''; // Clear previous content
    appRoot.appendChild(authCard);

    // Add event listeners
    document.getElementById('auth-toggle-link').addEventListener('click', () => {
        t.isLogin = !t.isLogin; // Toggle mode
        renderApp(); // Rerender the app
    });
    document.querySelector('.lang-toggle').addEventListener('click', () => {
        appLanguage = (appLanguage === 'bn' ? 'en' : 'bn');
        localStorage.setItem('appLang', appLanguage);
        renderApp(); // Rerender the app
    });

    document.getElementById('auth-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('auth-submit-btn');
        const messageArea = document.getElementById('auth-message-area');
        messageArea.innerHTML = ''; // Clear previous messages
        submitBtn.disabled = true;
        submitBtn.textContent = t.wait;

        const email = document.getElementById('auth-email').value;
        const password = document.getElementById('auth-password').value;
        const name = t.isLogin ? '' : document.getElementById('auth-name').value;

        try {
            if (t.isLogin) {
                await window.auth.signInWithEmailAndPassword(email, password);
            } else {
                const userCredential = await window.auth.createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;

                await user.updateProfile({ displayName: name });
                await user.sendEmailVerification();
                
                await window.db.collection("users").doc(user.uid).set({
                  email: email,
                  name: name,
                  created_at: new Date(),
                  currency: "BDT",
                  language: appLanguage
                });

                messageArea.innerHTML = `<div class="success-msg">${t.verificationSent}</div>`;
                await window.auth.signOut();
                t.isLogin = true; // Switch to login mode
                renderApp();
            }
        } catch (err) {
            let errorMessage = err.message;
            if (err.code === 'auth/wrong-password') errorMessage = t.errorPass;
            else if (err.code === 'auth/user-not-found') errorMessage = t.errorUser;
            else if (err.code === 'auth/email-already-in-use') errorMessage = t.errorEmail;
            messageArea.innerHTML = `<div class="error-msg">${errorMessage}</div>`;
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = t.isLogin ? t.loginBtn : t.signupBtn;
        }
    });
    // Initialize t.isLogin state for the first render
    t.isLogin = true;
}

// Function to render the Email Verification Screen
function renderVerificationScreen() {
    const t = translations[appLanguage];

    const verificationScreen = document.createElement('div');
    verificationScreen.className = 'auth-container fade-in';
    verificationScreen.innerHTML = `
        <div class="auth-card" style="text-align: center;">
            <div style="font-size: 50px; margin-bottom: 10px;">📩</div>
            <h2 style="color: var(--warning);">${t.emailVerificationNeeded}</h2>
            
            <p>${t.hello} <b>${currentUser.displayName || "ব্যবহারকারী"}</b>!</p>
            <p style="line-height: 1.6; color: var(--text-muted);">
                ${t.verifyEmailSubtitle}
            </p>

            <div class="error-msg" style="border-color: var(--warning); color: var(--warning); background: rgba(245, 158, 11, 0.1);">
                ⚠️ ${t.checkSpam.replace('{email}', currentUser.email)}
            </div>
            
            <button class="submit-btn" id="verified-refresh-btn" style="margin-top: 10px; background: var(--accent);">
                ${t.verifiedRefresh}
            </button>
            
            <button class="submit-btn" id="resend-link-btn" style="margin-top: 10px; background: transparent; border: 1px solid var(--border);">
                ${t.resendLink}
            </button>

            <p class="toggle-link" id="login-other-account-link" style="margin-top: 20px; display: block;">
                ${t.loginWithOther}
            </p>
        </div>
    `;

    const appRoot = document.getElementById('app-root');
    appRoot.innerHTML = '';
    appRoot.appendChild(verificationScreen);

    // Add event listeners
    document.getElementById('verified-refresh-btn').addEventListener('click', () => window.location.reload());
    document.getElementById('resend-link-btn').addEventListener('click', async () => {
        if (currentUser) {
            try {
                await currentUser.sendEmailVerification();
                alert(t.verificationSent);
            } catch (err) {
                alert("Error: " + err.message);
            }
        }
    });
    document.getElementById('login-other-account-link').addEventListener('click', () => window.auth.signOut());
}

// Function to render the Sidebar
function renderSidebar() {
    const t = translations[appLanguage];
    const appRoot = document.getElementById('app-root'); // Get root again

    let sidebarElement = document.getElementById('app-sidebar');
    let sidebarOverlay = document.getElementById('sidebar-overlay');

    if (!sidebarElement) {
        // Create sidebar and overlay if they don't exist
        sidebarElement = document.createElement('div');
        sidebarElement.id = 'app-sidebar';
        sidebarElement.className = `sidebar ${isSidebarOpen ? 'open' : ''}`;
        appRoot.appendChild(sidebarElement);

        sidebarOverlay = document.createElement('div');
        sidebarOverlay.id = 'sidebar-overlay';
        sidebarOverlay.className = `sidebar-overlay ${isSidebarOpen ? 'open' : ''}`;
        appRoot.appendChild(sidebarOverlay);
    } else {
        // Update classes if they already exist
        sidebarElement.className = `sidebar ${isSidebarOpen ? 'open' : ''}`;
        sidebarOverlay.className = `sidebar-overlay ${isSidebarOpen ? 'open' : ''}`;
    }

    sidebarElement.innerHTML = `
        <div class="sidebar-header">
            <div class="sidebar-logo">দৈনিক খরচ</div>
        </div>
        <ul class="sidebar-nav-list">
            <li class="sidebar-nav-item" data-page="dashboard">
                <span class="icon">🏠</span>
                ${t.dashboard}
            </li>
            <li class="sidebar-nav-item" data-page="transactions">
                <span class="icon">💸</span>
                ${t.transactions}
            </li>
            <li class="sidebar-nav-item" data-page="reports">
                <span class="icon">📈</span>
                ${t.reports}
            </li>
            <li class="sidebar-nav-item" data-page="categories">
                <span class="icon">🏷️</span>
                ${t.categories}
            </li>
            <li class="sidebar-nav-item" data-page="settings">
                <span class="icon">⚙️</span>
                ${t.settings}
            </li>
        </ul>
        <div class="sidebar-lang-toggle">
            <button id="sidebar-lang-toggle-btn">
                ${appLanguage === "bn" ? "English" : "বাংলা"}
            </button>
        </div>
        <button class="sidebar-logout-btn" id="sidebar-logout-btn">
            ${t.logout}
        </button>
    `;

    // Add event listeners
    sidebarOverlay.addEventListener('click', () => {
        isSidebarOpen = false;
        renderApp();
    });
    document.getElementById('sidebar-lang-toggle-btn').addEventListener('click', () => {
        appLanguage = (appLanguage === 'bn' ? 'en' : 'bn');
        localStorage.setItem('appLang', appLanguage);
        renderApp(); // Rerender to update language everywhere
    });
    document.getElementById('sidebar-logout-btn').addEventListener('click', () => window.auth.signOut());
    
    sidebarElement.querySelectorAll('.sidebar-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            currentPage = e.currentTarget.dataset.page;
            isSidebarOpen = false; // Close sidebar
            renderApp();
        });
    });
}


// Function to render the Dashboard
function renderDashboard() {
    const t = translations[appLanguage];

    const formatCurrency = (amount) => {
        return `${appLanguage === 'bn' ? '৳' : '৳'} ${amount.toLocaleString(appLanguage === 'bn' ? 'bn-BD' : 'en-US')}`;
    };

    // Dummy Data for demonstration
    const dummyFinancialData = {
        totalBalance: 50000,
        monthlyIncome: 30000,
        monthlyExpense: 15000,
        remainingBudget: 15000,
    };

    const dummyTransactions = [
        { id: 't1', icon: '🍔', category: t.food || 'খাবার', date: '2024-02-13', amount: 350, isIncome: false },
        { id: 't2', icon: '🚌', category: t.transport || 'যাতায়াত', date: '2024-02-12', amount: 120, isIncome: false },
        { id: 't3', icon: '💰', category: t.salary || 'বেতন', date: '2024-02-10', amount: 20000, isIncome: true },
        { id: 't4', icon: '💡', category: t.bills || 'বিল', date: '2024-02-10', amount: 800, isIncome: false },
        { id: 't5', icon: '🛒', category: t.groceries || 'বাজার', date: '2024-02-09', amount: 1500, isIncome: false },
    ];

    const dashboardHtml = `
        <div class="dashboard-main-content">
            <div class="dashboard-header">
                <button class="hamburger-menu" id="hamburger-menu-btn">☰</button>
                <h1 class="dashboard-title">${t.dashboardTitle || 'ড্যাশবোর্ড'}</h1>
                <button class="lang-toggle" id="dashboard-lang-toggle-btn" style="position: static; margin-right: 0;">
                    ${appLanguage === "bn" ? "Eng" : "বাং"}
                </button>
            </div>

            <div class="financial-cards-grid">
                <div class="card fade-in">
                    <div class="card-icon">💰</div>
                    <div class="card-title">${t.totalBalance || 'মোট ব্যালেন্স'}</div>
                    <div class="card-value">${formatCurrency(dummyFinancialData.totalBalance)}</div>
                </div>
                <div class="card fade-in">
                    <div class="card-icon">⬆️</div>
                    <div class="card-title">${t.monthlyIncome || 'মাসিক আয়'}</div>
                    <div class="card-value">${formatCurrency(dummyFinancialData.monthlyIncome)}</div>
                </div>
                <div class="card fade-in">
                    <div class="card-icon">⬇️</div>
                    <div class="card-title">${t.monthlyExpense || 'মাসিক খরচ'}</div>
                    <div class="card-value">${formatCurrency(dummyFinancialData.monthlyExpense)}</div>
                </div>
                <div class="card fade-in">
                    <div class="card-icon">🎯</div>
                    <div class="card-title">${t.remainingBudget || 'বাকি বাজেট'}</div>
                    <div class="card-value">${formatCurrency(dummyFinancialData.remainingBudget)}</div>
                </div>
            </div>

            <h2 class="section-header fade-in">${t.recentTransactions || 'সাম্প্রতিক লেনদেন'}</h2>
            <div class="transaction-list">
                ${dummyTransactions.map(transaction => `
                    <div class="transaction-item fade-in">
                        <div class="transaction-icon" style="background-color: ${transaction.isIncome ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};">
                            ${transaction.icon}
                        </div>
                        <div class="transaction-details">
                            <div class="transaction-category">${transaction.category}</div>
                            <div class="transaction-date">${new Date(transaction.date).toLocaleDateString(appLanguage === 'bn' ? 'bn-BD' : 'en-US', { day: 'numeric', month: 'short' })}</div>
                        </div>
                        <div class="transaction-amount ${transaction.isIncome ? 'income' : ''}">
                            ${formatCurrency(transaction.amount)}
                        </div>
                    </div>
                `).join('')}
            </div>

            <h2 class="section-header fade-in">${t.spendingBreakdown || 'খরচের বিশ্লেষণ'}</h2>
            <div class="chart-container fade-in">
                <p style="color: var(--text-muted);">${t.loadingChart || 'চার্ট লোড হচ্ছে...'}</p>
            </div>
        </div>

        <button class="fab-button" id="fab-button">
            +
        </button>
    `;

    const appRoot = document.getElementById('app-root');
    appRoot.innerHTML = dashboardHtml; // Set dashboard content

    // Add event listeners after content is rendered
    document.getElementById('hamburger-menu-btn').addEventListener('click', () => {
        isSidebarOpen = true;
        renderApp();
    });
    document.getElementById('dashboard-lang-toggle-btn').addEventListener('click', () => {
        appLanguage = (appLanguage === 'bn' ? 'en' : 'bn');
        localStorage.setItem('appLang', appLanguage);
        renderApp();
    });
    document.getElementById('fab-button').addEventListener('click', () => {
        console.log("FAB clicked - Open Add Expense Form");
        // Implement opening add expense form later
    });

    // Render sidebar after dashboard if it's open
    if (isSidebarOpen) {
        renderSidebar();
    }
}

// Function to render Settings Page
function renderSettingsPage() {
    const t = translations[appLanguage];
    const settingsHtml = `
        <div class="dashboard-main-content">
            <div class="dashboard-header">
                <button class="hamburger-menu" id="hamburger-menu-btn-settings">☰</button>
                <h1 class="dashboard-title">${t.settings}</h1>
                <button class="lang-toggle" id="settings-lang-toggle-btn" style="position: static; margin-right: 0;">
                    ${appLanguage === "bn" ? "Eng" : "বাং"}
                </button>
            </div>
            <div class="auth-card fade-in" style="text-align: center;">
                <h3>${t.settings}</h3>
                <p>${t.otherSettingsHere || 'অন্যান্য সেটিংস এখানে আসবে।'}</p>
                <button class="submit-btn" id="back-to-dashboard-btn" style="margin-top: 20px;">
                    ${t.dashboard || 'ড্যাশবোর্ড'}
                </button>
            </div>
        </div>
    `;

    const appRoot = document.getElementById('app-root');
    appRoot.innerHTML = settingsHtml;

    document.getElementById('hamburger-menu-btn-settings').addEventListener('click', () => {
        isSidebarOpen = true;
        renderApp();
    });
    document.getElementById('settings-lang-toggle-btn').addEventListener('click', () => {
        appLanguage = (appLanguage === 'bn' ? 'en' : 'bn');
        localStorage.setItem('appLang', appLanguage);
        renderApp();
    });
    document.getElementById('back-to-dashboard-btn').addEventListener('click', () => {
        currentPage = 'dashboard';
        renderApp();
    });

    if (isSidebarOpen) {
        renderSidebar();
    }
}


// Main App Renderer
function renderApp() {
    const t = translations[appLanguage]; // Get fresh translations based on current language

    document.title = getTranslation('appTitle') || 'দৈনিক খরচ ট্র্যাকার'; // Update document title

    // 1. Loading State
    if (currentUser === null && !window.auth.currentUser) { // Check if Firebase is still loading auth state
        document.getElementById('app-root').innerHTML = `<div style="color: var(--text-muted); text-align: center;">${t.appLoading}</div>`;
        return;
    }

    // 2. No user -> Render Auth Form
    if (!currentUser) {
        renderAuthForm();
        return;
    }

    // 3. User exists but email not verified -> Render Verification Screen
    if (!currentUser.emailVerified) {
        renderVerificationScreen();
        return;
    }

    // 4. User is verified -> Render Main App Layout (Dashboard or other pages)
    if (currentPage === 'dashboard') {
        renderDashboard();
    } else if (currentPage === 'settings') {
        renderSettingsPage();
    } 
    // Add conditions for other pages (transactions, reports, categories) here later
    
    // Ensure sidebar is rendered if open for verified users
    if (isSidebarOpen) {
        renderSidebar();
    } else {
        // If sidebar should be closed, remove it from DOM if it exists
        const existingSidebar = document.getElementById('app-sidebar');
        const existingOverlay = document.getElementById('sidebar-overlay');
        if (existingSidebar) existingSidebar.remove();
        if (existingOverlay) existingOverlay.remove();
    }
}


// Firebase Auth State Listener (initialization)
window.auth.onAuthStateChanged(async (user) => {
    currentUser = user;
    if (user && user.emailVerified) {
        // Fetch user's language preference from Firestore if logged in
        const userDoc = await window.db.collection("users").doc(user.uid).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            if (userData.language) {
                appLanguage = userData.language; // Update global language state
                localStorage.setItem('appLang', userData.language);
            }
        }
    }
    renderApp(); // Re-render the app based on new auth state
});

// Initial render call
// This will be called once after scripts are loaded, and then onAuthStateChanged will trigger subsequent renders
renderApp();