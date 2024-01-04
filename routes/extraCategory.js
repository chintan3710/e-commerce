const express = require("express");

const extraCategoryController = require("../controllers/extraCategoryController");

const routes = express.Router();

routes.get("/add_extraCategory", extraCategoryController.add_extraCategory);

routes.post(
    "/insertExtraCategoryData",
    extraCategoryController.insertExtraCategoryData
);

routes.get("/view_extraCategory", extraCategoryController.view_extraCategory);

routes.get("/updateExtraCategory", extraCategoryController.updateExtraCategory);

routes.post(
    "/editExtraCategoryData",
    extraCategoryController.editExtraCategoryData
);

routes.get("/deleteExtraCategory", extraCategoryController.deleteExtraCategory);

routes.get(
    "/deactiveExtraCategory",
    extraCategoryController.deactiveExtraCategory
);

routes.get("/activeExtraCategory", extraCategoryController.activeExtraCategory);

routes.post("/getSubcategory", extraCategoryController.getSubcategory);

routes.post("/getExtraCategory", extraCategoryController.getExtraCategory);

routes.post("/getBrandType", extraCategoryController.getBrandType);

module.exports = routes;
