import express from "express";
import { create } from "../controllers/kpoController";

const kpoRouter=express.Router()

kpoRouter.post("/Salle",create)

export default kpoRouter;