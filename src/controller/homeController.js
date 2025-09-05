
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
    await userService.deleteUser(req.params.id)
    return res.redirect("/user");
}

const getUpdateUserPage = async (req, res) => {
    let id = req.params.id
    let user = await userService.getUserById(id);
    let userData = {};
    userData = user;

    return res.render("user-update.ejs", { userData }) //express sẽ vào folder views để tìm file home.ejs và vì đã cấu hình trong file server nên express mới biết được khu vực lấy

    // return res.redirect("/user");
}

const handleUpdateUserPage = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
    await userService.updateUserInfor(email, username, id)

    return res.redirect("/user");
}

module.exports = {
    handleHelloWord, handleUser, handleCreateNewUser, handleDeleteUser, getUpdateUserPage,
    handleUpdateUserPage
}