import userApiService from '../service/userApiService'

const readFunc = async (req, res) => {
    try {
        if (req.query && req.query.limit && req.query.page) {
            let limit = +req.query.limit;
            let page = +req.query.page;
            let response = await userApiService.getUserWithPagination(limit, page);
            if (response && response.DT) {
                return res.status(200).json(response)
            }
        } else {
            let response = await userApiService.getAllUsers();
            if (response) {
                return res.status(200).json(response)
            };
        }
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: -1, //error code
            DT: error, // data
        })
    };
};

const createFunc = async (req, res) => {
    try {
        let response = await userApiService.createNewUsers(req.body, req.query.action);
        if (response) {
            return res.status(200).json(response)
        };
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: -1, //error code
            DT: error, // data
        })
    };
};

const updateFunc = async (req, res) => {
    try {
        let response = await userApiService.updateUsers(req.body, req.query.action);
        if (response) {
            return res.status(200).json(response)
        };
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: -1, //error code
            DT: error, // data
        })
    };
};

const deleteFunc = async (req, res) => {
    try {
        console.log(req)
        const { id } = req.params;
        const { userId } = req.query;
        let response = await userApiService.deleteUsers(id, userId);
        if (response) {
            return res.status(200).json(response)
        };
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: -1, //error code
            DT: error, // data
        })
    };
};

const getUserAccount = (req, res) => {
    try {
        if (req.user) { // thuộc tính user trong req là thuộc tính ta đã gắn thủ công khi login bởi middleware checkUserJWT         
            let user = { ...req.user };
            let token = req.token;
            return res.status(200).json({
                EM: 'ok', // error message
                EC: 0, //error code
                DT: {
                    ...user,
                    access_token: token
                }, // data
            });
        }
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: -1, //error code
            DT: error, // data
        })
    }
}

module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc,
    getUserAccount
};