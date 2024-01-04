const mongoose = require("mongoose");

const subcategorySchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    subcategory_name: {
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

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = Subcategory;
