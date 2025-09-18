import jwt from "jsonwebtoken"
require("dotenv").config()

const createJWT = (payload) => {
    let secret = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, secret);
    } catch (error) {
        console.log(error);
    }
    return token
}


const verifyToken = (token) => {
    let secret = process.env.JWT_SECRET;
    let data = null;
    try {
        let decoded = jwt.verify(token, secret);
        data = decoded;
    } catch (error) {
        console.log(error);
    }
    return data
}


module.exports = {
    createJWT, verifyToken
}