import { auth } from './firebase-config.js'; // Firebase auth সার্ভিস ইম্পোর্ট

// নতুন ইউজার রেজিস্টার করা
export async function registerUser(email, password, name) {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
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
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// ভেরিফিকেশন ইমেইল পাঠানো
export async function sendVerificationEmailToUser(user) {
  try {
    await user.sendEmailVerification();
  } catch (error) {
    throw error;
  }
}

// ইউজার লগআউট করা
export async function logoutUser() {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    throw error;
  }
}

// বর্তমান ইউজারের ইমেইল ভেরিফিকেশন স্টেট রিফ্রেশ করা
export async function refreshUserVerificationStatus() {
  const user = firebase.auth().currentUser;
  if (user) {
    await user.reload(); // Firebase থেকে ইউজারের সর্বশেষ ডেটা লোড করা
    return firebase.auth().currentUser.emailVerified;
  }
  return false;
}