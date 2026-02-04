import express from "express";
import SalleController from "../controllers/salleController.js";
import LoginController from "../controllers/loginController.js";

const salleRouter = express.Router();

// Routes publiques (READ)
salleRouter.get("/salles", SalleController.getAll);
salleRouter.get("/salles/:id", SalleController.getById);


// Routes protégées (CREATE - admin uniquement)
salleRouter.post("/salles", LoginController.verifyToken, LoginController.checkAdmin, SalleController.create);
salleRouter.patch("/salles/:id", LoginController.verifyToken, LoginController.checkAdmin,SalleController.modifyRoom);
salleRouter.delete("salles/:id", LoginController.verifyToken, LoginController.checkAdmin, SalleController.deleteRoom)
export default salleRouter;