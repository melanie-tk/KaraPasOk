import express from "express";
import reservController from "../controllers/reservController.js"

const reservRouter = express.Router();

reservRouter.post("/reserv", reservController.createReserv);
reservRouter.get("/checkReserv", reservController.checkReserv);
reservRouter.get("/sendCheckReserv", reservController.checkReserv);





export default reservRouter;
