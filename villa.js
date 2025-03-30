import { db } from "./firebase.js";
import { collection, doc, getDoc, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// 📌 Charger une villa depuis Firebase
async function chargerVilla(villaId) {
    const docRef = doc(db, "villas", villaId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const villa = docSnap.data();
        document.querySelector(".property-title").textContent = villa.nom;
        document.querySelector(".property-image").src = villa.image;
        return villa;
    } else {
        console.error("Villa introuvable !");
    }
}

// 📌 Charger toutes les villas (ex: sur la page d'accueil)
async function chargerToutesVillas() {
    const querySnapshot = await getDocs(collection(db, "villas"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
}

export { chargerVilla, chargerToutesVillas };
