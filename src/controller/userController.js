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


module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc,
};