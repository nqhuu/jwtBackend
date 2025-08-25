import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

//config view endine
configViewEngine(app);

//init web routes
initWebRoutes(app);

app.listen(PORT, () => {
    console.log("jwt backend running : " + PORT);
})