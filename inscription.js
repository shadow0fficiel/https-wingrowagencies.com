// ==============================
// 1. Récupération du parrain
// ==============================
const urlParams = new URLSearchParams(window.location.search);
const parrain = urlParams.get('parrain');
const champParrain = document.getElementById('parrain');

if (parrain && parrain.trim() !== "") {
  champParrain.value = parrain;
} else {
  champParrain.value = "Inscription directe";
}

// ==============================
// 2. Définition des pays CFA
// ==============================
const paysXOF = ["BJ", "BF", "CI", "GW", "ML", "NE", "SN", "TG"];
const paysXAF = ["CM", "CF", "TD", "CG", "GQ", "GA"];

// ==============================
// 3. Soumission du formulaire
// ==============================
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const pays = document.querySelector("select").value;
  const password = document.querySelector('input[type="password"]').value;
  const confirmPassword = document.querySelectorAll('input[type="password"]')[1].value;
  const terms = document.getElementById("terms");

  // 🔴 Conditions non acceptées
  if (!terms.checked) {
    alert("⚠️ Vous devez accepter les conditions générales.");
    terms.focus();
    return;
  }

  // 🔴 Mots de passe différents
  if (password !== confirmPassword) {
    alert("❌ Les mots de passe ne correspondent pas.");
    return;
  }

  // 🔴 Aucun pays sélectionné
  if (!pays) {
    alert("❌ Veuillez sélectionner un pays éligible (Zone Franc CFA).");
    return;
  }

  // ==============================
  // 4. Détection de la zone
  // ==============================
  let zone = "";

  if (paysXOF.includes(pays)) {
    zone = "XOF";
  } else if (paysXAF.includes(pays)) {
    zone = "XAF";
  } else {
    alert("❌ Ce pays n'est pas éligible à WinGrow.");
    return;
  }

  // ==============================
  // 5. Sauvegarde temporaire
  // (simulation base de données)
  // ==============================
  localStorage.setItem("wingrow_zone", zone);
  localStorage.setItem("wingrow_parrain", champParrain.value);

  // ==============================
  // 6. Redirection paiement
  // ==============================
  if (zone === "XOF") {
    window.location.href = "paiement-xof.html";
  } else if (zone === "XAF") {
    window.location.href = "paiement-xaf.html";
  }
});