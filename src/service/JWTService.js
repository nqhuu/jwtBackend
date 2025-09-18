import db from "../models/index"


const getGroupWithRoles = async (user) => {
    try {
        let response = await db.Group.findOne({
            where: { id: user.groupId },
            attributes: ['id', 'name', 'description'],  // chỉ lấy 3 cột này
            include: {
                model: db.Role,
                as: "groupRole",
                attributes: ['id', 'url', 'description'],
                through: { attributes: [] } //không lấy các giá trị của bảng thứ 3 của quan hệ n-n
            },  // lấy thông tin nhóm của user
            // order: [["name", "ASC"]], // sắp xếp thứ tự theo bảng chữ cái , lấy cột name để sắp xếp
        });
        return response ?? {}; // data
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
    getGroupWithRoles
}