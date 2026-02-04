// 1. Tambahkan import untuk Storage di sini
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    updateProfile 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// --- Tambahan untuk Fitur Upload ---
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = { 
    apiKey: "AIzaSyBza18gWjdcky8wjFM7fyhEXhTQBYbYS7I", 
    authDomain: "gaming-f291c.firebaseapp.com", 
    projectId: "gaming-f291c", 
    storageBucket: "gaming-f291c.firebasestorage.app", 
    messagingSenderId: "1067360600746", 
    appId: "1:1067360600746:web:7418d2eebb703c424146d3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// --- Hubungkan ke Storage ---
const storage = getStorage(app); 

function errorAnim(id) {
    const el = document.getElementById(id);
    if (el) {
        el.classList.add("error-shake");
        setTimeout(() => el.classList.remove("error-shake"), 400);
    }
}

// LOGIKA REGISTER
document.getElementById("btnRegister").onclick = async () => {
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const pass = document.getElementById("regPassword").value;
    try {
        const res = await createUserWithEmailAndPassword(auth, email, pass);
        // Memberikan nama default saat mendaftar
        await updateProfile(res.user, { displayName: name });
        alert("Berhasil! Silakan Login.");
        location.reload();
    } catch (e) { errorAnim("register-box"); alert(e.message); }
};

// LOGIKA LOGIN EMAIL
document.getElementById("btnLogin").onclick = async () => {
    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPassword").value;
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        window.location.href = "home.html";
    } catch (e) { errorAnim("login-box"); }
};

// LOGIKA LOGIN GOOGLE
document.getElementById("btnLoginGoogle").onclick = async () => {
    try {
        await signInWithPopup(auth, provider);
        window.location.href = "home.html";
    } catch (e) { errorAnim("login-box"); }
};