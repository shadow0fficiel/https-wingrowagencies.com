const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Connexion MongoDB (on va remplacer après)
mongoose.connect("TON_LIEN_MONGODB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connecté à MongoDB"))
.catch(err => console.log(err));

// 🧍‍♂️ Modèle utilisateur
const User = mongoose.model("User", {
    email: String,
    password: String,
    balance: { type: Number, default: 0 },
    isActive: { type: Boolean, default: false }
});

// 📝 Inscription
app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    const user = new User({ email, password });
    await user.save();

    res.json({ message: "Compte créé" });
});

// 🔑 Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) return res.status(400).json({ message: "Erreur" });

    res.json({ message: "Connecté", user });
});

// 🚀 Serveur
app.listen(3000, () => {
    console.log("Serveur lancé sur port 3000");
});