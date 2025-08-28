
import userService from "../service/userService"

const handleHelloWord = (req, res) => {
    let name = "huu";
    return res.render("home.ejs", { name }) //express sẽ vào folder views để tìm file home.ejs và vì đã cấu hình trong file server nên express mới biết được khu vực lấy
}

const handleUser = (req, res) => {
    return res.render("user.ejs") //express sẽ vào folder views để tìm file home.ejs và vì đã cấu hình trong file server nên express mới biết được khu vực lấy
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    // userService.createNewUser(email, password, username)
    // Load hash from your password DB.
    // let checkPassword = bcrypt.compareSync(password, hashPassword); // true
    userService.getUserList();

    return res.send("user-ejs") //express sẽ vào folder views để tìm file home.ejs và vì đã cấu hình trong file server nên express mới biết được khu vực lấy
}

module.exports = {
    handleHelloWord, handleUser, handleCreateNewUser
}