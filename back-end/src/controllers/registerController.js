import { User } from '../models/user.js';

export async function create(req, res) {
    try {
        const { firstname, lastname, email, password } = req.body;

        // On crée l'utilisateur avec le mot de passe direct, sans bcrypt
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: password // Enregistré en texte brut
        });

        await newUser.save();

        res.status(201).json({
            message: "Utilisateur créé (sans hachage) !",
            user: { email: newUser.email }
        });
    } catch (err) {
        res.status(500).json({ 
            message: "Erreur lors de l'inscription", 
            error: err.message 
        });
    }
}