import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB9Dm29elmoP-5XkVQLdZ6IFyoKuPUn7n4',
  authDomain: 'church-localizer.firebaseapp.com',
  projectId: 'church-localizer',
  storageBucket: 'church-localizer.appspot.com',
  messagingSenderId: '814534805428',
  appId: '1:814534805428:web:332d391c3694174e28d4e1',
  measurementId: 'G-M1TPJMHSMN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
