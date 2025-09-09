import loginRegisterService from '../service/loginRegisterService'

const getAllUsers = (req, res) => {
    return res.status(200).json({
        message: "All users retrieved successfully",
        data: "Here will be all users"
    });
}

const handleRegister = async (req, res) => {
    // console.log(req.body)
    try {
        let response = await loginRegisterService.registerNewUser(req.body)
        if (response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', //error code
            DT: error, // data
        })
    }
}

module.exports = {
    getAllUsers, handleRegister
}