import db from "../models/index";

const getAllUsers = async () => {
    try {
        let response = await db.User.findAll({
            // attributes: ['id', 'email', 'username', 'address', 'sex', 'phone', 'groupId']  // chỉ lấy 3 cột này
            attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'groupId'] }, // loại bỏ các cột này
            include: [{ model: db.Group, as: "groupData", attributes: ['id', 'name', 'description'] }]  // lấy thông tin nhóm của user
        });
        if (response) {
            return ({
                EM: 'Tải dữ liệu thành công', // error message
                EC: 0, //error code
                DT: response, // data
            });
        } else {
            return ({
                EM: 'Không có dữ liệu', // error message
                EC: 1, //error code
                DT: [], // data
            });
        }

    } catch (error) {
        console.log(error);
        return ({
            EM: 'error from server', // error message
            EC: -1, //error code
            DT: [], // data
        });
    }
}

const createNewUsers = async () => {
    try {

    } catch (error) {
        console.log(error);
        return ({
            EM: 'error from server', // error message
            EC: -1, //error code
            DT: [], // data
        });
    }
}

const updateUsers = async () => {
    try {

    } catch (error) {
        console.log(error);
        return ({
            EM: 'error from server', // error message
            EC: -1, //error code
            DT: [], // data
        });
    }
}

const deleteUsers = async () => {
    try {

    } catch (error) {
        console.log(error);
        return ({
            EM: 'error from server', // error message
            EC: -1, //error code
            DT: [], // data
        });
    }
}

module.exports = {
    getAllUsers,
    createNewUsers,
    updateUsers,
    deleteUsers
}
