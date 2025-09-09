import db from '../models/index';
import hashPassword from '../config/hashPassword'

// const salt = bcrypt.genSaltSync(10);

// const hashPassword = (password) => {
//     let hashPassword = bcrypt.hashSync(password, salt);
//     return hashPassword;
// }

// Tạo mới user
const registerNewUser = async (rawUserData) => {
    // Load hash from your password DB.
    let hashPass = hashPassword(rawUserData.password);
    console.log(hashPass)

    try {
        // await db.User.create({
        //     email: email,
        //     password: hashPass,
        //     username: username
        // })
    } catch (error) {
        console.log("error=======>>>>>>>>>", error)

    }
}


module.exports = {
    registerNewUser,
}