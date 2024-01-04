const mongoose = require("mongoose");

const multer = require("multer");

const path = require("path");

const productImagePath = "/uploads/productImages";

const productMulImagePath = "/uploads/productMulImages";

const productSchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        required: true,
    },
    extraCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExtraCategory",
        required: true,
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Type",
        required: true,
    },
    product_title: {
        type: String,
        required: true,
    },
    product_price: {
        type: String,
        required: true,
    },
    product_old_price: {
        type: String,
        required: true,
    },
    product_color: {
        type: Array,
        required: true,
    },
    product_size: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    productMulImage: {
        type: Array,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    created_date: {
        type: String,
        required: true,
    },
    updated_date: {
        type: String,
        required: true,
    },
});

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname == "productImage") {
            cb(null, path.join(__dirname, "..", productImagePath));
        } else {
            cb(null, path.join(__dirname, "..", productMulImagePath));
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Math.random() * 1000000000);
    },
});

productSchema.statics.productUploadImage = multer({
    storage: imageStorage,
}).fields([
    { name: "productImage", maxCount: 1 },
    { name: "productMulImage", maxCount: 5 },
]);

productSchema.statics.imageModelPath = productImagePath;

productSchema.statics.imageModelMulPath = productMulImagePath;

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
