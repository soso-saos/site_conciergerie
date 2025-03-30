import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import app from './firebase-config';  // Importe la configuration Firebase

const db = getFirestore(app);  // Initialisation de Firestore avec l'app Firebase

// Exemple : Sauvegarder un utilisateur dans Firestore
async function saveUser() {
  await setDoc(doc(db, "users", "ayeds"), {
    username: "Ayeds",
    email: "ayeds@example.com"
  });
  console.log("Utilisateur sauvegardé !");
}

// Exemple : Récupérer un utilisateur depuis Firestore
async function getUser() {
  const userSnap = await getDoc(doc(db, "users", "ayeds"));
  if (userSnap.exists()) {
    console.log("Utilisateur récupéré :", userSnap.data());
  } else {
    console.log("Aucun utilisateur trouvé !");
  }
}

saveUser();
getUser();
