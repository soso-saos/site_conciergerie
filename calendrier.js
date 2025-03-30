import { db } from "./firebase.js";
import { collection, doc, getDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// 📌 Récupérer les dates bloquées d'une villa
async function chargerDatesBloquees(villaId) {
    const docRef = doc(db, "villas", villaId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().datesBloquees || [];
    } else {
        return [];
    }
}

// 📌 Bloquer une date après réservation
async function bloquerDates(villaId, dates) {
    const docRef = doc(db, "villas", villaId);
    await updateDoc(docRef, {
        datesBloquees: arrayUnion(...dates)
    });
    console.log("Dates ajoutées !");
}

export { chargerDatesBloquees, bloquerDates };
