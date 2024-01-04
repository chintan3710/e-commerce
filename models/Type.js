const mongoose = require("mongoose");

const typeSchema = mongoose.Schema({
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
    type: {
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

const Type = mongoose.model("Type", typeSchema);

module.exports = Type;
