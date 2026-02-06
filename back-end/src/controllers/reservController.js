import { Reserv } from '../models/reserv.js';
import mongoose from "mongoose";

class reservController {

    static async createReserv(req, res) {
        try {
            const { idRoom, dateStart, dateEnd, idUser } = req.query;
            const newReserv = new Reserv({
                timestampStart: dateStart,
                timestampEnd: dateEnd,
                room: idRoom,
                user: idUser,
            });
            await newReserv.save();

            res.json({
                message: "Réservation créée avec succès",
                data: newReserv
            });

        } catch (error) {
            console.error(error);
            res.json({ message: "Erreur lors de la création de la réservation" });
        }
    }
    static async checkReserv(req, res) {

        const { idRoom, dateStart, dateEnd } = req.query;
        const reservs = await Reserv.find({ room: idRoom }).select(["timestampStart", "timestampEnd"])
        const allReservDebut = reservs.map(r => r.timestampStart);
        const allReservFin = reservs.map(r => r.timestampEnd);
        const timestampActuelle = Date.now()

        if (dateStart < timestampActuelle) {
            return res.json({
                error: "La date de début est dans le passé"
            });

        } else {

            for (let i = 0; i < allReservDebut.length; i++) {
                const debutExistante = allReservDebut[i];
                const finExistante = allReservFin[i];

                if (dateStart <= finExistante && dateEnd >= debutExistante) {
                    return res.json({
                        error: "La salle est déjà réservée sur cette période"
                    });
                    break;
                }
            }
        }
        return res.json({
            message: "Salle disponible"
        });
    };
}

export default reservController;