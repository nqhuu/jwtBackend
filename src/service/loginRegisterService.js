import db from '../models/index';
import hashPassword from '../config/hashPassword'
import e from 'express';

const checkUserEmail = async (userEmail) => {
    try {
        let user = await db.User.findOne({ where: { email: userEmail } });
        if (user) {
            return true
        };
    } catch (error) {
        return error;
    };
};

const checkUserPhone = async (userPhone) => {
    try {
        let user = await db.User.findOne({ where: { phone: userPhone } }); //phone
        if (user) {
            return true
        };
    } catch (error) {
        return error;
    };
};

// Tạo mới user
const registerNewUser = async (rawUserData) => {
    try {
        let checkEmail = await checkUserEmail(rawUserData.email);
        let checkPhone = await checkUserPhone(rawUserData.phone);
        if (checkEmail === true) {
            return ({
                EM: 'Email đã tồn tại', // error message
                EC: '1', //error code
                DT: '', // data
            })
        }
        if (checkPhone === true) {
            return ({
                EM: 'Số điện thoại đã tồn tại', // error message
                EC: '2', //error code
                DT: '', // data
            })
        }
        // Load hash from your password DB.
        let hashPass = hashPassword(rawUserData.password);
        let { email, username, phone } = rawUserData;
        let create = await db.User.create({
            email: email,
            password: hashPass,
            username: username,
            phone: phone,
        })
        // console.log(">>>registerNewUser check create new user: ", create)
        if (create && create.id) {
            return ({
                EM: 'Tạo mới user thành công', // error message
                EC: '0', //error code
                DT: '', // data 
            })
        }
    } catch (error) {
        console.log("error=======>>>>>>>>>", error)
        return ({
            EM: 'error from server', // error message
            EC: '-1', //error code
            DT: '', // data
        })
    }
}


module.exports = {
    registerNewUser,
}