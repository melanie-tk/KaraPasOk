import { Room } from '../models/login.js';

class SalleController {
    
    // CREATE - Créer une salle
    static async create(req, res) {
        try {
            const { name, capacity, description, pricePerDay } = req.body;

            const newRoom = new Room({
                name,
                capacity,
                description,
                pricePerDay
            });

            await newRoom.save();

            res.json({
                message: "Salle créée avec succès",
                data: newRoom
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la création de la salle" });
        }
    }

    // READ - Récupérer toutes les salles
    static async getAll(req, res) {
        try {
            const rooms = await Room.find();
            
            res.json({
                message: "Liste des salles",
                data: rooms
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des salles" });
        }
    }

    // READ - Récupérer une salle par ID
    static async getById(req, res) {
        try {
            const room = await Room.findById(req.params.id).populate({path: "reservs", match: { timestampEnd: { $gt: new Date().getTime()}}});
            console.log(new Date().getTime())
            if (!room) {
                return res.status(404).json({ message: "Salle non trouvée" });
            }

            res.json({
                message: "Détails de la salle",
                data: room
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération de la salle" });
        }
    }
}

export default SalleController;