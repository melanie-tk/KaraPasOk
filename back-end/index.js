import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import loginRouter from "back-end\src\routes\loginRouter.js";  
import salleRouter from "back-end\src\routes\salleRouter.js";   
import registerRouter from "back-end\src\routes\registerRouteur.js";  
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Connecté à MongoDB avec succès"))
    .catch((err) => console.error("Erreur de connexion MongoDB :", err));
mongoose.set("strictQuery", true);

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", loginRouter);    
app.use("/api", salleRouter);    
app.use("/api", registerRouter);   

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});