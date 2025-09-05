import bcrypt from 'bcryptjs';
// import mysql from 'mysql2';
import mysql from 'mysql2/promise';

// get the promise implementation, we will use bluebird
import bluebird from 'bluebird';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

// Tạo mới user
const createNewUser = async (email, password, username) => {
    // Load hash from your password DB.
    let hashPass = hashPassword(password);

    try {
        await db.User.create({
            email: email,
            password: hashPass,
            username: username
        })
    } catch (error) {
        console.log("error=======>>>>>>>>>", error)

    }
}

// Tìm lên tất cả user
const getUserList = async () => {
    try {
        let userList = [];
        userList = await db.User.findAll({
            raw: true
            /**
             * đưa về object thuần tuý của js, có thể áp dụng được cho cả giá trị trả về là mảng hay object, 
             * nó tự động đưa các obj trong mảng về kiểu obj thuần tuý của js, 
             * tuy nhiên khi sử dụng raw thì chỉ để đọc dữ liệu ,
             * muốn thao tác với dữ liệu và ghi lại db thì sẽ không sử dụng được
             * */
        })
        return userList;
    } catch (error) {
        console.log("error=======>>>>>>>>>", error)
    }
}

// Xoá user theo id
const deleteUser = async (id) => {
    try {
        await db.User.destroy({
            where: { id: id, },
        });
    } catch (error) {
        console.log("error=======>>>>>>>>>", error)
    }
}

//tìm user theo id
const getUserById = async (id) => {
    try {
        let user = {}
        user = await db.User.findOne({
            where: { id: id, },
            attributes: ['id', 'username', 'email']
        });
        return user.get({ plain: true });
        /**
         * sử dụng get({ plain: true }); để đưa về object thuần tuý của js, nó chỉ dùng được với object
         * 
         * sử dụng với findByPk
         * user = await db.User.findByPk(id, {
            attributes: ['id', 'username', 'email']
        }
        ); // findByPk chỉ dùng để tim theo khoá chính
         * */
    } catch (error) {
        console.log("error=======>>>>>>>>>", error)
    }
}

const updateUserInfor = async (email, username, id) => {

    try {
        user = await db.User.update(
            { email: email, username: username },
            {
                where: { id: id, },
            }
        );
    } catch (error) {
        console.log("error=======>>>>>>>>>", error)
    }
}
module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}