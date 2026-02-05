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
            const room = await Room.findById(req.params.id);

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
    // FONCTION POUR MODIFIER SALLE
    static async modifyRoom(req, res) {
        const id = req.params.id
        const data = req.body
        try {
            const room = await Room.updateOne({ _id: id }, data)
            res.json({ ok: true })
        } catch (error) {
            console.error(error);
            res.json({ ok: false, error: error })
        }
    }
    
    //essaie de la fct DELETE 
    static async deleteRoom(req, res) {
    const id = req.params.id
    try {
        const room = await Room.deleteOne({ _id: id })
        res.json({ ok: true })
    } catch (error) {
        console.error(error);
        res.json({ ok: false, error: error })
    }
}
    
}



export default SalleController;