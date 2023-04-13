import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: 'quiz-app-146be.firebaseapp.com',
	projectId: 'quiz-app-146be',
	storageBucket: 'quiz-app-146be.appspot.com',
	messagingSenderId: '774297740494',
	appId: '1:774297740494:web:bc1000136fe0a6d074dc9f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth();
