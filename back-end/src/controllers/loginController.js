import User from '../models/user.js';
import jwt from 'jsonwebtoken'; // <--- IMPORTANT : Ajout de l'import pour le Token

class LoginController {
    
    // Connexion
    static async login(req, res) {
        const { login_mail, login_pass } = req.body;

        try {
            const user = await User.findOne({ email: login_mail });
            
            if (!user) {
                return res.status(401).json({ message: "Email ou mot de passe incorrect" });
            }

            // MODIFICATION : Comparaison directe car tu n'utilises plus bcrypt à l'inscription
            const isPasswordValid = (login_pass === user.password);
            
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Email ou mot de passe incorrect" });
            }

            // Génération du Token
            const token = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET || 'ma_cle_secrete_temporaire', // Valeur de secours si .env vide
                { expiresIn: '24h' }
            );

            res.json({
                message: "Connexion réussie",
                token: token,
                user: {
                    id: user._id,
                    firstname: user.firstName,
                    lastname: user.lastName,
                    email: user.email,
                    role: user.role
                }
            });

        } catch (error) {
            console.error("Erreur Login:", error);
            res.status(500).json({ message: "Erreur serveur", details: error.message });
        }
    }

    static verifyToken(req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Plus robuste pour extraire le token

        if (!token) {
            return res.status(401).json({ message: "Token manquant" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ma_cle_secrete_temporaire');
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Token invalide" });
        }
    }

    static checkAdmin(req, res, next) {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Accès refusé. Admin uniquement." });
        }
        next();
    }
}

export default LoginController;