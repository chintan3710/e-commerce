const express = require("express");

const routes = express.Router();

const categoryContoller = require("../controllers/categoryContoller");

routes.get("/add_category", categoryContoller.add_category);

routes.post("/insertCategoryData", categoryContoller.insertCategoryData);

routes.get("/view_category", categoryContoller.view_category);

routes.get("/updateCategory", categoryContoller.updateCategory);

routes.post("/editCategoryData", categoryContoller.editCategoryData);

routes.get("/deleteCategory", categoryContoller.deleteCategory);

routes.get("/deactiveCategory", categoryContoller.deactiveCategory);

routes.get("/activeCategory", categoryContoller.activeCategory);

module.exports = routes;
