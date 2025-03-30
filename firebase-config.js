const firebaseConfig = {
  apiKey: "AIzaSyCS4ix7FePyQaRYlRXVxi5ghS7bI25kJVI",
  authDomain: "site-concierge.firebaseapp.com",
  projectId: "site-concierge",
  storageBucket: "site-concierge.firebasestorage.app",
  messagingSenderId: "863521292746",
  appId: "1:863521292746:web:9ec193e10e42f4f5680f33",
  measurementId: "G-6F7ZQLQHF9"
};

// Initialiser Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialiser Firestore
const db = firebase.firestore(app);