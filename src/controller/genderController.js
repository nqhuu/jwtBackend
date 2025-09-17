import genderService from "../service/genderService"

const readFunc = async (req, res) => {
    try {
        let response = await genderService.getAllGender();
        if (response && response.DT) {
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: -1, //error code
            DT: error, // data
        })
    };
}


module.exports = {
    readFunc,
    // createFunc,
    // updateFunc,
    // deleteFunc,
};