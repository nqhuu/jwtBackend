import jwt from "jsonwebtoken"
require("dotenv").config();

const createJWT = (payload) => {
    let secret = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, secret, {
            expiresIn: process.env.JWT_EXPIRES_IN // thời gian hết hạn của token
        });
    } catch (error) {
        console.log(error);
    }
    return token
}


const verifyToken = (token) => {
    let secret = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, secret);
    } catch (error) {
        console.log(error);
    }
    return decoded
}

let nonSecurePaths = ["/", "/login", "/register"]

// sử dụng middleware để check đăng nhập với token JWT
const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next(); //nếu truy cập vào 1 trong các đường link trong nonSecurePaths thì sẽ cho qua luôn không cần check user cũng như quyền hạn
    let cookies = req.cookies; // check cookies gửi về từ fe
    if (cookies && cookies.jwt) {
        let token = cookies.jwt;
        let decoded = verifyToken(token);// giải mã token
        if (decoded) {
            req.user = decoded; // gán thêm thuộc tính user vào req để xử lý bên service
            req.token = token; // gán thêm thuộc tính token vào req để xử lý bên service
            next();
        } else {
            return res.status(401).json({
                EC: -1,
                EM: "Bạn cần đăng nhập",
                DT: []
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            EM: "Bạn cần đăng nhập",
            DT: []
        })
    }
}

//check quyền truy cập tới routes
const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === "/account") return next();

    if (req.user) {
        let email = req.user.email; // thuộc tính user trong req là thuộc tính ta đã gắn thủ công khi login bởi middleware checkUserJWT
        let roles = req.user.role.groupRole;
        let currentUrl = req.path; // lấy ra url đang được gọi từ fe
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                EM: "Bạn chưa có quyền này",
                DT: []
            })
        }
        let canAccess = roles.some(item => {
            return item.url == currentUrl // so sánh url trong chuỗi JWT (các url dk quyền của user) với url gửi gửi từ fe?

        })
        if (canAccess) return next(); // nếu có thì cho thông qua với từ khoá next
        return res.status(403).json({
            EC: -1,
            EM: "Bạn chưa có quyền này",
            DT: []
        })
    } else {
        return res.status(401).json({
            EC: -1,
            EM: "Bạn cần đăng nhập",
            DT: []
        })
    }
}

module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermission
}