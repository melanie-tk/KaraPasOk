import express from "express";
import { create } from "../controllers/registerController.js";

const kpoRouter = express.Router();


kpoRouter.post("/register", create); 

export default kpoRouter;