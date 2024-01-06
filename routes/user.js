const express = require("express");

const userController = require("../controllers/userController");

const routes = express.Router();

routes.get("/", userController.home);

routes.get("/category", userController.category);

module.exports = routes;
