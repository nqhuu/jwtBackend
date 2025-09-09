// Add headers before the routes are defined -- cấu hình header cho phép kết nối từ bên ngoài vào (CORS)
require("dotenv").config();

const configCors = (app) => {
    const allowedOrigins = [
        process.env.REACT_URL,
        process.env.REACT_URL_LC,
        process.env.REACT_URL_IP
    ];
    app.use(function (req, res, next) {
        // console.log(req.headers)
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            // Website you wish to allow to connect -- chỉ cho phép domain này kết nối đến
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        // Website you wish to allow to connect -- chỉ cho phép domain này kết nối đến
        // res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

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
}

export default configCors;