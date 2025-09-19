import loginRegisterService from '../service/loginRegisterService'

const getAllUsers = (req, res) => {
    return res.status(200).json({
        message: "All users retrieved successfully",
        data: "Here will be all users"
    });
};

const handleRegister = async (req, res) => {
    try {
        let response = await loginRegisterService.registerNewUser(req.body);
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

const handleLogin = async (req, res) => {
    try {
        let response = await loginRegisterService.handleLogin(req.body);
        if (response) {
            res.cookie("jwt", response.DT.access_token, { httpOnly: true }); //set cookie từ phía server là 1 obj chưa key "jwt" value "response.DT.access_token" , httpOnly: true chỉ có thể đọc từ phía BE
            return res.status(200).json(response);
        };
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: -1, //error code
        })
    };
};

module.exports = {
    getAllUsers, handleRegister, handleLogin,
};