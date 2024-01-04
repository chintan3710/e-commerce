const express = require("express");

const subcategoryController = require("../controllers/subcategoryController");

const routes = express.Router();

routes.get("/add_subcategory", subcategoryController.add_subcategory);

routes.post(
    "/insertSubcategoryData",
    subcategoryController.insertSubcategoryData
);

routes.get("/view_subcategory", subcategoryController.view_subcategory);

routes.get("/updateSubcategory", subcategoryController.updateSubcategory);

routes.post("/editSubcategoryData", subcategoryController.editSubcategoryData);

routes.get("/deleteSubcategory", subcategoryController.deleteSubcategory);

routes.get("/deactiveSubcategory", subcategoryController.deactiveSubcategory);

routes.get("/activeSubcategory", subcategoryController.activeSubcategory);

module.exports = routes;
