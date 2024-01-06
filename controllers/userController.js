const Category = require("../models/Category");

const Subcategory = require("../models/Subcategory");

const ExtraCategory = require("../models/ExtraCategory");

module.exports.home = async (req, res) => {
    try {
        let categoryData = await Category.find({});
        let subcategoryData = await Subcategory.find({});
        let extraCategoryData = await ExtraCategory.find({});
        return res.render("user/home", {
            categoryData: categoryData,
            subcategoryData: subcategoryData,
            extraCategoryData: extraCategoryData,
        });
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.category = async (req, res) => {
    try {
        let categoryData = await Category.find({});
        let subcategoryData = await Subcategory.find({});
        let extraCategoryData = await ExtraCategory.find({});
        return res.render("user/category", {
            categoryData: categoryData,
            subcategoryData: subcategoryData,
            extraCategoryData: extraCategoryData,
        });
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};
