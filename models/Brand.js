const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
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
    brand_name: {
        type: String,
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

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
