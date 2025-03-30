import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCS4ix7FePyQaRYlRXVxi5ghS7bI25kJVI",
    authDomain: "site-concierge.firebaseapp.com",
    projectId: "site-concierge",
    storageBucket: "site-concierge.firebasestorage.app",
    messagingSenderId: "863521292746",
    appId: "1:863521292746:web:9ec193e10e42f4f5680f33",
    measurementId: "G-6F7ZQLQHF9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let blockedDates = {}; // Variable globale pour stocker les dates bloquées

export async function loadBlockedDates() {
    const snapshot = await getDocs(collection(db, "blockedDates"));
    blockedDates = {}; // Réinitialise les dates bloquées
    snapshot.forEach(doc => {
        blockedDates[doc.id] = doc.data().dates || [];
    });
    console.log("blockedDates chargé :", blockedDates);
}

export async function saveBlockedDates() {
    const selectedProduct = document.getElementById("villa-select").value;
    const dates = blockedDates[selectedProduct] || [];
    console.log("Enregistrement dans Firestore :", { selectedProduct, dates });
    await setDoc(doc(db, "blockedDates", selectedProduct), { dates });
}

export async function toggleBlock(date) {
    const selectedProduct = document.getElementById("villa-select").value;

    if (!blockedDates[selectedProduct]) {
        blockedDates[selectedProduct] = [];
    }

    const index = blockedDates[selectedProduct].indexOf(date);
    const dayCell = document.querySelector(`[data-date="${date}"]`);

    if (index > -1) {
        blockedDates[selectedProduct].splice(index, 1);
        console.log(`Date débloquée : ${date}`);
        if (dayCell) dayCell.classList.remove('blocked');
        if (dayCell) dayCell.classList.add('unblocked');
    } else {
        blockedDates[selectedProduct].push(date);
        console.log(`Date bloquée : ${date}`);
        if (dayCell) dayCell.classList.remove('unblocked');
        if (dayCell) dayCell.classList.add('blocked');
    }

    await saveBlockedDates(); // Enregistre dans Firestore
}

export async function renderCalendar(date) {
    await loadBlockedDates(); // Charge les dates bloquées avant de rendre le calendrier
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = ''; // Réinitialise le contenu du calendrier
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('day');
        dayCell.textContent = day;
        const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        dayCell.dataset.date = formattedDate;

        if (blockedDates[document.getElementById("villa-select").value]?.includes(formattedDate)) {
            dayCell.classList.add('blocked');
        } else {
            dayCell.classList.add('unblocked');
        }

        dayCell.addEventListener('click', () => toggleBlock(formattedDate));

        calendar.appendChild(dayCell);
    }
}