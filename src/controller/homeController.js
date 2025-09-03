
import userService from "../service/userService"

const handleHelloWord = (req, res) => {
    let name = "huu";
    return res.render("home.ejs", { name }) //express sẽ vào folder views để tìm file home.ejs và vì đã cấu hình trong file server nên express mới biết được khu vực lấy
}

const handleUser = async (req, res) => {
    let userList = await userService.getUserList();
    return res.render("user.ejs", { userList }) //express sẽ vào folder views để tìm file home.ejs và vì đã cấu hình trong file server nên express mới biết được khu vực lấy
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    userService.createNewUser(email, password, username)
    return res.redirect("/user");
}

const handleDeleteUser = async (req, res) => {
    // console.log(req.params.id)
    // let id = req.params.id
    await userService.deleteUser(req.params.id)
    return res.redirect("/user");
}

module.exports = {
    handleHelloWord, handleUser, handleCreateNewUser, handleDeleteUser
}