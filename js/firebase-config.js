// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// তোমার Firebase কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyCLxjV6QYFldtIH1HAXiz-cxa22veVp-kU",
  authDomain: "expensetrackerpwa-6b23f.firebaseapp.com",
  projectId: "expensetrackerpwa-6b23f",
  storageBucket: "expensetrackerpwa-6b23f.firebasestorage.app",
  messagingSenderId: "542779197190",
  appId: "1:542779197190:web:3abb3eacef3af93c7ac087",
  measurementId: "G-4TSKLVWSXS"
};

// অ্যাপ ইনিশিয়ালাইজ করা
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// auth এবং db এক্সপোর্ট করা যাতে অন্য JS ফাইলগুলো এগুলো ব্যবহার করতে পারে
export { auth, db, app };