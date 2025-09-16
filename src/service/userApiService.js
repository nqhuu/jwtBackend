import { raw } from "body-parser";
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

const getUserWithPagination = async (limit, page) => {
    try {
        // console.log(">>>check limit: ", limit, "check page: ", page)
        if (limit && page) {
            let offset = (page - 1) * limit;
            let { count, rows } = await db.User.findAndCountAll({
                limit: limit,
                offset: offset,
                attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'groupId'] }, // loại bỏ các cột này
                include: [{ model: db.Group, as: "groupData", attributes: ['id', 'name', 'description'] }],  // lấy thông tin nhóm của user
                // raw: true,
            });
            if (count) {
                let totalPages = Math.ceil(count / limit); // tổng số trang
                return ({
                    EM: 'Tải dữ liệu thành công', // error message
                    EC: 0, //error code
                    DT: {
                        users: rows,
                        totalRows: count, // tổng số bản ghi
                        totalPages: totalPages,
                    }, // data
                });
            }
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

const deleteUsers = async (id, userId) => {
    try {
        if (id === userId) {
            return ({
                EM: 'Bạn không thể xóa chính mình', // error message
                EC: 1, //error code
                DT: [], // data
            });
        }

        let user = await db.User.findOne({
            where: { id: id },
            // raw: false,
        });

        if (!user) {
            return ({
                EM: 'Người dùng không tồn tại', // error message
                EC: 2, //error code
                DT: [], // data
            });
        }

        await user.destroy();
        return ({
            EM: 'Xóa người dùng thành công', // error message
            EC: 0, //error code
            DT: [], // data
        });

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
    deleteUsers,
    getUserWithPagination,
}
