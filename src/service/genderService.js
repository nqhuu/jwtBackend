import db from '../models/index';

const getAllGender = async () => {
    try {
        // let response = await db.Group.findAll({
        //     attributes: ['id', 'name', 'description'],  // chỉ lấy 3 cột này
        //     include: [{ model: db.Role, as: "groupRole" }]  // lấy thông tin nhóm của user
        // });
        // if (response) {
        //     return ({
        //         EM: 'Tải dữ liệu thành công', // error message
        //         EC: 0, //error code
        //         DT: response, // data
        //     });
        // }
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
    getAllGender
}
