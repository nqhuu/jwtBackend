const { Op } = require('sequelize');
import { raw } from "body-parser";
import hashPassword from "../config/hashPassword"
import db from "../models/index";
import _ from "lodash";

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

const isValidInputs = (input, action) => {
    let valueCheck = { ...input }
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!regex.test(valueCheck.email)) {
        return ({
            EM: 'Email không hợp lệ', // error message
            EC: 3, //error code
            DT: [], // data
        });
    };
    for (let key in valueCheck) {
        if (!valueCheck[key]) {
            return ({
                EM: 'Vui lòng điền đầy đủ thông tin', // error message
                EC: 4, //error code
                DT: [], // data
            });
        }
    }
    if (action === "create" && valueCheck && valueCheck.password && valueCheck.password.length < 6) {
        toast.error("Mật khẩu phải có ít nhất 6 ký tự");
        return ({
            EM: 'Mật khẩu phải có ít nhất 6 ký tự', // error message
            EC: 5, //error code
            DT: [], // data
        });
    }
    return true;
}

const createNewUsers = async (data, action) => {
    try {

        let checkInput = isValidInputs(data, action)
        if (_.isObject(checkInput)) {
            return ({
                ...checkInput
            })
        }
        let hashPass = hashPassword(data.password)
        let userExist = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: data.email },
                    { phone: data.phone }
                ]
            },
        })

        if (userExist) {
            return ({
                EM: 'Email hoặc số điện thoại đã tồn tại', // error message
                EC: 1, //error code
                DT: '', // data
            })
        }

        let createUser = await db.User.create({
            email: data.email,
            username: data.username,
            password: hashPass,
            address: data.address,
            phone: data.phone,
            groupId: data.groupId,
            sex: data.sex
        })
        if (_.isEmpty(createUser)) {
            return ({
                EM: 'Error : Chưa tạo được tài khoản', // error message
                EC: 2, //error code
                DT: [], // data
            });
        }
        return ({
            EM: 'Tạo tài khoản thành công', // error message
            EC: 0, //error code
            DT: [], //
        })
    } catch (error) {
        console.log(error);
        return ({
            EM: 'error from server', // error message
            EC: -1, //error code
            DT: [], // data
        });
    }
}

const updateUsers = async (data, action) => {
    try {
        let checkInput = isValidInputs(data, action)
        if (_.isObject(checkInput)) {
            return ({
                ...checkInput
            })
        }
        let userExist = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: data.email },
                    { phone: data.phone }
                ]
            },
        })

        if (!userExist) {
            return {
                EM: 'User không tồn tại',
                EC: 1,
                DT: ''
            }
        }

        if (userExist.get({ plain: true }).email !== data.email) {
            let userExistEmail = await db.User.findOne({
                where: { email: data.email },
                raw: true
            })
            if (userExistEmail) {
                return ({
                    EM: 'Email đã tồn tại', // error message
                    EC: 2, //error code
                    DT: '', // data
                })
            }
        }

        if (userExist.get({ plain: true }).phone !== data.phone) {
            let userExistPhone = await db.User.findOne({
                where: { phone: data.phone },
                raw: true

            })
            if (userExistPhone) {
                return ({
                    EM: 'Số điện thoại đã tồn tại', // error message
                    EC: 3, //error code
                    DT: '', // data
                })
            }
        }

        // gán giá trị mới vào instance
        userExist.email = data.email;
        userExist.username = data.username;
        userExist.address = data.address;
        userExist.sex = data.sex;
        userExist.phone = data.phone;
        userExist.groupId = data.groupId;

        let userUpdate = await userExist.save();
        if (!userUpdate) {
            return ({
                EM: 'Update không thành công', // error message
                EC: -2, //error code
                DT: [], // data
            });
        }
        return {
            EM: 'Cập nhật thành công',
            EC: 0,
            DT: []
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

const deleteUsers = async (id, userLoginId) => {
    try {
        if (id === userLoginId) {
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
