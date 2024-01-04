const express = require("express");

const brandController = require("../controllers/brandController");

const routes = express.Router();

routes.get("/add_brand", brandController.add_brand);

routes.post("/insertBrandData", brandController.insertBrandData);

routes.get("/view_brand", brandController.view_brand);

routes.get("/updateBrand", brandController.updateBrand);

routes.post(
    "/editBrandData",
    brandController.editBrandData
);

routes.get("/deleteBrand", brandController.deleteBrand);

routes.get("/deactiveBrand", brandController.deactiveBrand);

routes.get("/activeBrand", brandController.activeBrand);

module.exports = routes;
