import bcrypt from 'bcryptjs';
// import mysql from 'mysql2';
import mysql from 'mysql2/promise';

// get the promise implementation, we will use bluebird
import bluebird from 'bluebird';

// create the connection, specify bluebird as Promise


// create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'jwt',
//     // rowsAsArray: false //rowsAsArray: false đảm bảo kết quả trả về là object thay vì TextRow.
// });

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

const getUserList = async () => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

    let users = [];

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    } catch (error) {
        console.log("error=======>>>>>>>>>", error)

    }
}

module.exports = {
    createNewUser, getUserList
}