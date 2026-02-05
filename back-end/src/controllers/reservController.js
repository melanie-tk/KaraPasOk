import { Reserv } from '../models/reserv.js';
import mongoose from "mongoose";

class reservController {

       static async createReserv(req, res) {
               try {
                   const newReserv = new Reserv({
                       timestampStart: 1770159600000,
                       timestampEnd: 1770301015012,
                       room: "69849fa3fa0156b91d55d783",
                       user: "69830e2a59e3a0f8c086c89b"
                   });
                    console.log(newReserv)
                   await newReserv.save();
       
                   res.json({
                       message: "Réservation créée avec succès",
                       data: newReserv
                   });
       
               } catch (error) {
                   console.error(error);
                   res.status(500).json({ message: "Erreur lors de la création de la réservation" });
               }
           }
    static async checkReservation(req, res) {
        const { idRoom, reservDebut, reservFin } = req.body;

        let maReservDebut = Math.floor(new Date(reservDebut).getTime() / 1000);
        let maReservFin = Math.floor(new Date(reservFin).getTime() / 1000);
        let timestampActuelle = Math.floor(Date.now() / 1000);

        const allReservDebut = [
            1770159600, // 4 février
            1771542000  // 20 février
        ];

        const allReservFin = [
            1770332400, // 6 février
            1772060400  // 26 février
        ];

        if (maReservDebut < timestampActuelle) {
            return res.json({
                message: "Vous ne pouvez pas réserver dans le passé"
            });
        }

        for (let i = 0; i < allReservDebut.length; i++) {
            const debutExistante = allReservDebut[i];
            const finExistante = allReservFin[i];

            if (maReservDebut <= finExistante && maReservFin >= debutExistante) {
                break;
            } else {

                return res.json({
                    id,
                    reservDebut,
                    reservFin,
                });
            }
        }
    };
}

export default reservController;