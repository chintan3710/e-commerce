const express = require("express");

const routes = express.Router();

const Product = require("../models/Product");

const productController = require("../controllers/productController");

routes.get("/add_product", productController.add_product);

routes.post(
    "/insertProductData",
    Product.productUploadImage,
    productController.insertProductData
);

routes.get("/view_product", productController.view_product);

routes.get("/view_single_product", productController.view_single_product);

module.exports = routes;
