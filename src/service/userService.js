import bcrypt from 'bcryptjs';
import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    // rowsAsArray: false //rowsAsArray: false đảm bảo kết quả trả về là object thay vì TextRow.
});

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

const createNewUser = (email, password, username) => {
    let hashPass = hashPassword(password);
    // with placeholder - insert data vào bảng user
    connection.query(
        'INSERT INTO users (email, password, username) VALUES(?, ?, ?); ', [email, hashPass, username],
        function (err, results) {
            console.log(results);
        }
    );
}

const getUserList = () => {
    let users = [];
    connection.query(
        'SELECT * FROM users',
        function (err, results, fields) {
            console.log("list user =====>", results);
        }
    );
}

module.exports = {
    createNewUser, getUserList
}