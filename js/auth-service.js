import { auth } from './firebase-config.js'; // Firebase auth সার্ভিস ইম্পোর্ট
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


// নতুন ইউজার রেজিস্টার করা
export async function registerUser(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // ইউজারের নাম সেট করা (যদি Firebase এ সাপোর্ট করে)
    await userCredential.user.updateProfile({ displayName: name });
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// ইউজার লগইন করা
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// ভেরিফিকেশন ইমেইল পাঠানো
export async function sendVerificationEmailToUser(user) {
  try {
    await sendEmailVerification(user);
  } catch (error) {
    throw error;
  }
}

// ইউজার লগআউট করা
export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
}

// বর্তমান ইউজারের ইমেইল ভেরিফিকেশন স্টেট রিফ্রেশ করা
export async function refreshUserVerificationStatus() {
  const user = auth.currentUser; // Firebase auth অবজেক্ট থেকে বর্তমান ইউজার
  if (user) {
    await user.reload(); // Firebase থেকে ইউজারের সর্বশেষ ডেটা লোড করা
    return auth.currentUser.emailVerified;
  }
  return false;
}