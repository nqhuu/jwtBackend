const getAllUsers = (req, res) => {
    return res.status(200).json({
        message: "All users retrieved successfully",
        data: "Here will be all users"
    });
}

module.exports = {
    getAllUsers
}