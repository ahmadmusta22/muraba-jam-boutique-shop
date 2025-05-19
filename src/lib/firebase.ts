import { initializeApp } from "firebase/app";
import { getAuth, EmailAuthProvider, GoogleAuthProvider, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, getDoc, getDocs, query, where, enableIndexedDbPersistence, setDoc } from "firebase/firestore";
import { getDatabase } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW0GPrwOdwnRtT2egkZyWz1o9i7-9Usks",
  authDomain: "muraba-1a035.firebaseapp.com",
  projectId: "muraba-1a035",
  storageBucket: "muraba-1a035.appspot.com",
  messagingSenderId: "1025174866413",
  appId: "1:1025174866413:web:31a7f53e42f7b0d144",
  measurementId: "G-PK65K7FFSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a time.
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      // The current browser doesn't support persistence
      console.warn('The current browser does not support persistence.');
    }
  });

// Providers
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Helper function to check if a user is an admin
export const isUserAdmin = async (userId: string): Promise<boolean> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (!userDoc.exists()) {
      console.log('User document does not exist, creating one...');
      // Create user document if it doesn't exist
      await setDoc(doc(db, 'users', userId), {
        role: 'user',
        createdAt: new Date(),
      });
      return false;
    }

    const userData = userDoc.data();
    console.log('User data:', { ...userData, id: userId });
    
    return userData?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// Helper function to set user as admin
export const setUserAsAdmin = async (userId: string): Promise<void> => {
  try {
    await setDoc(doc(db, 'users', userId), {
      role: 'admin',
      updatedAt: new Date(),
    }, { merge: true });
  } catch (error) {
    console.error('Error setting user as admin:', error);
    throw error;
  }
};

// Helper function to get admin stats
export const getAdminStats = async () => {
  const usersSnapshot = await getDocs(collection(db, 'users'));
  const productsSnapshot = await getDocs(collection(db, 'products'));
  const messagesQuery = query(
    collection(db, 'messages'),
    where('read', '==', false)
  );
  const messagesSnapshot = await getDocs(messagesQuery);

  return {
    totalUsers: usersSnapshot.size,
    totalProducts: productsSnapshot.size,
    newMessages: messagesSnapshot.size,
    // Add more stats as needed
  };
};

// Helper function to create an admin user
export const createAdminUser = async (email: string, password: string): Promise<void> => {
  try {
    // Create the user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Set the user as admin
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: 'admin',
      createdAt: new Date(),
    });

    console.log('Admin user created successfully:', user.uid);
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};

export { auth, db, googleProvider, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier, EmailAuthProvider, app };