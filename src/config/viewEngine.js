import express from "express";

/**
 * 
 * @param {*} app - express app
 */

let configViewEngine = (app) => {
    app.use(express.static("./src/public")); // folder chứa các file static
    app.set("view engine", "ejs"); // set view Engine là ejs (dùng ejs để viết giao diện html)
    app.set("views", "./src/views") // xác định folder chứa các file views, khi render nó sẽ tìm đến thư mục này để lấy các file view

}

module.exports = configViewEngine;