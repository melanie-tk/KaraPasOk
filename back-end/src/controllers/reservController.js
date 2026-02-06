import { Reserv } from '../models/reserv.js';
import mongoose from "mongoose";

class reservController {

       static async createReserv(req, res) {
               try {
                const { idRoom, dateStart, dateEnd, idUser} = req.body;
                   const newReserv = new Reserv({
                       timestampStart: dateStart,
                       timestampEnd: dateEnd,
                       room: idRoom,
                       user: idUser,
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


    static async checkReserv(req, res) {

        const { idRoom, dateStart, dateEnd } = req.query;
        
  console.log("idRoom :", idRoom);
  console.log("dateStart :", dateStart);
  console.log("dateEnd :", dateEnd);

        // const { idRoom, reservDebut, reservFin } = req.body;
        // let maReservDebut = reservDebut;
        // let maReservFin = reservFin;
        // let timestampActuelle = Date.now();

        const reserv = await Reserv.find()

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