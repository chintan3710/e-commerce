const Category = require("../models/Category");

const Subcategory = require("../models/Subcategory");

const ExtraCategory = require("../models/ExtraCategory");

const Brand = require("../models/Brand");

const Type = require("../models/Type");

module.exports.add_extraCategory = async (req, res) => {
    try {
        const categoryData = await Category.find({});
        const subcategoryData = await Subcategory.find({});
        return res.render("admin/add_extraCategory", {
            categoryData: categoryData,
            subcategoryData: subcategoryData,
        });
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.insertExtraCategoryData = async (req, res) => {
    try {
        if (req.body) {
            req.body.isActive = true;
            req.body.created_date = new Date().toLocaleString();
            req.body.updated_date = new Date().toLocaleString();
            let extraCategoryData = ExtraCategory.create(req.body);
            if (extraCategoryData) {
                return res.redirect("back");
            } else {
                console.log("Data not insert");
                return res.redirect("back");
            }
        } else {
            console.log("Data not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.view_extraCategory = async (req, res) => {
    try {
        let search = "";
        let page;
        if (req.query.page) {
            page = req.query.page;
        } else {
            page = 0;
        }
        let perPage = 10;

        if (req.query.search) {
            search = req.query.search;
        }

        let totalExtraCatData = await ExtraCategory.find({
            $or: [
                {
                    extraCategory_name: {
                        $regex: ".*" + search + ".*",
                        $options: "i",
                    },
                },
            ],
        }).countDocuments();

        let extraCategoryData = await ExtraCategory.find({
            $or: [
                {
                    extraCategory_name: {
                        $regex: ".*" + search + ".*",
                        $options: "i",
                    },
                },
            ],
        })
            .limit(perPage)
            .skip(perPage * page)
            .populate("subcategory")
            .populate("category")
            .exec();
        // console.log(extraCategoryData);
        if (extraCategoryData) {
            return res.render("admin/view_extraCategory", {
                extraCategoryData: extraCategoryData,
                search: search,
                totalDocument: Math.ceil(totalExtraCatData / perPage),
                pageNo: parseInt(page),
            });
        } else {
            console.log("Data not found");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.updateExtraCategory = async (req, res) => {
    try {
        if (req.query.id) {
            let extraCategoryData = await ExtraCategory.findById(req.query.id)
                .populate("subcategory")
                .populate("category")
                .exec();
            let categoryData = await Category.find({});
            let subcategoryData = await Subcategory.find({});
            // console.log(extraCategoryData);
            if (extraCategoryData) {
                return res.render("admin/update_extraCategory", {
                    extraCategoryData: extraCategoryData,
                    categoryData: categoryData,
                    subcategoryData: subcategoryData,
                });
            } else {
                console.log("Data not found");
                return res.redirect("back");
            }
        } else {
            console.log("Invalid request");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.editExtraCategoryData = async (req, res) => {
    try {
        if (req.body.oldId) {
            let oldData = await ExtraCategory.findById(req.body.oldId);
            if (oldData) {
                let extraCategoryData = await ExtraCategory.findByIdAndUpdate(
                    req.body.oldId,
                    req.body
                );
                if (extraCategoryData) {
                    return res.redirect(
                        "/admin/extraCategory/view_extraCategory"
                    );
                } else {
                    console.log("Data not update");
                    return res.redirect("back");
                }
            } else {
                console.log("Data not found");
                return res.redirect("back");
            }
        } else {
            console.log("Invalid request");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.deleteExtraCategory = async (req, res) => {
    try {
        if (req.query.id) {
            let data = await ExtraCategory.findByIdAndDelete(req.query.id);
            if (data) {
                return res.redirect("back");
            } else {
                console.log("Extra category not deleted");
                return res.redirect("back");
            }
        } else {
            console.log("Extra category not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.deactiveExtraCategory = async (req, res) => {
    try {
        if (req.query.id) {
            let data = await ExtraCategory.findByIdAndUpdate(req.query.id, {
                isActive: false,
            });
            if (data) {
                return res.redirect("back");
            } else {
                console.log("ExtraCategory not deactivate");
                return res.redirect("back");
            }
        } else {
            console.log("ExtraCategory not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.activeExtraCategory = async (req, res) => {
    try {
        if (req.query.id) {
            let data = await ExtraCategory.findByIdAndUpdate(req.query.id, {
                isActive: true,
            });
            if (data) {
                return res.redirect("back");
            } else {
                console.log("ExtraCategory not activate");
                return res.redirect("back");
            }
        } else {
            console.log("ExtraCategory not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.getSubcategory = async (req, res) => {
    try {
        // console.log(req.body);
        let subcatData = await Subcategory.find({ category: req.body.catData });
        // console.log(subcatData);
        let optionData = "<option value=''>-- Select Subcategory --</option>";
        subcatData.map((v, i) => {
            optionData += `<option value='${v.id}'>${v.subcategory_name}</option>`;
        });
        return res.json(optionData);
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.getExtraCategory = async (req, res) => {
    try {
        // console.log(req.body);
        let extraCatData = await ExtraCategory.find({
            category: req.body.catData,
            subcategory: req.body.subcatData,
        });
        // console.log(extraCatData);
        let optionData =
            "<option value=''>-- Select Extra Category --</option>";
        extraCatData.map((v, i) => {
            optionData += `<option value='${v.id}'>${v.extraCategory_name}</option>`;
        });
        return res.json(optionData);
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.getBrandType = async (req, res) => {
    try {
        // console.log(req.body);
        let brandData = await Brand.find({
            category: req.body.catData,
            subcategory: req.body.subcatData,
            extraCategory: req.body.extraCatData,
        });
        let typeData = await Type.find({
            category: req.body.catData,
            subcategory: req.body.subcatData,
            extraCategory: req.body.extraCatData,
        });
        // console.log(brandData);
        // console.log(typeData);
        return res.render("admin/ajaxBrandType", {
            brandData: brandData,
            typeData: typeData,
        });
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};
