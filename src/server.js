import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import connection from "./config/connectDB"
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8686;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection DB
connection()

//config view endine
configViewEngine(app);

//init web routes
initWebRoutes(app);

app.listen(PORT, () => {
    console.log("jwt backend running : " + PORT);
})