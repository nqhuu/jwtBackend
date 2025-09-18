import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import bodyParser from "body-parser";
import connection from "./config/connectDB";
import configCors from "./config/cors";
import cookieParser from "cookie-parser";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8686;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());


// Add headers before the routes are defined -- cấu hình header cho phép kết nối từ bên ngoài vào (CORS)
configCors(app);

//test connection DB
connection()

//config view endine
configViewEngine(app);

//init web routes
initWebRoutes(app);

//init Api routes
initApiRoutes(app);

app.listen(PORT, () => {
    console.log("jwt backend running : " + PORT);
})