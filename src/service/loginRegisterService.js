import db from '../models/index';
import hashPassword from '../config/hashPassword';
import bcrypt from 'bcryptjs';


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

const handleLogin = async (rawUserData) => {
    try {
        let { valueInput, password } = rawUserData;
        let hashPass = hashPassword(password);
        // Kiểm tra valueInput là email hay phone
        // Regex kiểm tra định dạng email
        const emailRegex = /^\S+@\S+\.\S+$/;
        emailRegex.test(valueInput)
        // Xử lý đăng nhập bằng email
        let user = await db.User.findOne({
            where: emailRegex.test(valueInput) ? { email: valueInput } : { phone: valueInput },
            raw: true
        });
        if (user) {
            // Kiểm tra mật khẩu, so sánh mật khẩu người dùng nhập vào với mật khẩu đã mã hóa trong cơ sở dữ liệu
            let isPasswordCorrect = bcrypt.compareSync(password, user.password);
            if (isPasswordCorrect) {
                return ({
                    EM: 'Đăng nhập thành công', // error message
                    EC: '0', //error code
                    DT: {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        phone: user.phone,
                    }
                });
            } else {
                return ({
                    EM: 'Tài khoản hoặc mật khẩu không đúng', // error message
                    EC: '1', //error code
                    DT: '', // data 
                })
            };
        } else {
            return ({
                EM: 'Tài khoản hoặc mật khẩu không đúng', // error message
                EC: '-1', //error code
                DT: '', // data 
            })
        };
    } catch (error) {
        console.log("error=======>>>>>>>>>", error)
        return ({
            EM: 'error from server', // error message
            EC: '-2', //error code
            DT: '', // data
        })
    };
};
module.exports = {
    registerNewUser, handleLogin
}