import userApiService from '../service/userApiService'

const readFunc = async (req, res) => {
    try {
        let response = await userApiService.getAllUsers(req.body);
        if (response) {
            return res.status(200).json(response)
        };
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', //error code
            DT: error, // data
        })
    };
};

const createFunc = async (req, res) => {
    try {
        let response = await userApiService.createNewUsers(req.body);
        if (response) {
            return res.status(200).json(response)
        };
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', //error code
            DT: error, // data
        })
    };
};

const updateFunc = async (req, res) => {
    try {
        let response = await userApiService.updateUsers(req.body);
        if (response) {
            return res.status(200).json(response)
        };
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', //error code
            DT: error, // data
        })
    };
};

const deleteFunc = async (req, res) => {
    try {
        let response = await userApiService.deleteUsers(id);
        if (response) {
            return res.status(200).json(response)
        };
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', //error code
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