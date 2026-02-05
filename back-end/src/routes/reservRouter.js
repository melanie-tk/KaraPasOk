import express from "express";
import reservController from "../controllers/reservController.js"

const reservRouter = express.Router();

reservRouter.post("/reserv", reservController.createReserv);

export default reservRouter;
