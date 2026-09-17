// ===============================
// Paiement XOF - WinGrow Agencies
// Réseaux réels par pays
// ===============================

const reseauxParPays = {
    tg: ["TMoney", "Moov Money"],
    bj: ["MTN MoMo", "Moov Money"],
    ci: ["Orange Money", "MTN MoMo", "Wave"],
    sn: ["Orange Money", "Wave"],
    bf: ["Orange Money", "Moov Money"],
    ml: ["Orange Money", "Moov Money"],
    ne: ["Orange Money"],
    gw: ["MTN MoMo"]
  };
  
  // Récupération du pays depuis l’URL
  const params = new URLSearchParams(window.location.search);
  const pays = params.get("pays"); // ex: tg, bj, ci
  
  const reseauSelect = document.getElementById("reseau");
  const numeroInput = document.getElementById("numero");
  const paymentForm = document.getElementById("paymentForm");
  
  // Sécurité : pays obligatoire
  if (!pays || !reseauxParPays[pays]) {
    alert("⚠️ Pays non reconnu. Veuillez recommencer l’inscription.");
    // window.location.href = "inscription.html";
  }
  
  // Injection des réseaux selon le pays
  reseauxParPays[pays].forEach((reseau) => {
    const option = document.createElement("option");
    option.value = reseau;
    option.textContent = reseau;
    reseauSelect.appendChild(option);
  });
  
  // Soumission paiement
  paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const reseau = reseauSelect.value;
    const numero = numeroInput.value.trim();
  
    if (!reseau) {
      alert("⚠️ Veuillez sélectionner un réseau.");
      return;
    }
  
    if (numero.length < 8) {
      alert("⚠️ Numéro invalide.");
      return;
    }
  
    alert(
      "✅ Paiement d’activation lancé\n\n" +
      "Pays : " + pays.toUpperCase() + "\n" +
      "Réseau : " + reseau + "\n" +
      "Numéro : " + numero
    );
  
    // FUTUR :
    // appel API paiement
    // redirection dashboard XOF
    // window.location.href = "dashboard-xof.html";
  });