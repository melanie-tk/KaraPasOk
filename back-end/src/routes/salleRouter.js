import express from "express";
import SalleController from "../controllers/salleController.js";
import LoginController from "../controllers/loginController.js";

const salleRouter = express.Router();

// Routes publiques (READ)
salleRouter.get("/salles", SalleController.getAll);
salleRouter.get("/salles/:id", SalleController.getById);

// Routes protégées (CREATE - admin uniquement)
salleRouter.post("/salles", LoginController.verifyToken, LoginController.checkAdmin, SalleController.create);

export default salleRouter;