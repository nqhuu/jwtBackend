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

// Add headers before the routes are defined -- cấu hình header cho phép kết nối từ bên ngoài vào (CORS)
app.use(function (req, res, next) {

    // Website you wish to allow to connect -- chỉ cho phép domain này kết nối đến
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

    // Request methods you wish to allow -- cho phép các phương thức này kết nối đến
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow -- cho phép các header này kết nối đến
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions) -- cho phép gửi cookie
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//test connection DB
connection()

//config view endine
configViewEngine(app);

//init web routes
initWebRoutes(app);

app.listen(PORT, () => {
    console.log("jwt backend running : " + PORT);
})