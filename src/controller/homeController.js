import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});

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

    // with placeholder - insert data vào bảng user
    connection.query(
        'INSERT INTO users (email, password, username) VALUES(?, ?, ?); ', [email, password, username],
        function (err, results) {
            console.log(results);
        }
    );

    return res.send("user-ejs") //express sẽ vào folder views để tìm file home.ejs và vì đã cấu hình trong file server nên express mới biết được khu vực lấy
}

module.exports = {
    handleHelloWord, handleUser, handleCreateNewUser
}