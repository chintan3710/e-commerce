const Category = require("../models/Category");

const Subcategory = require("../models/Subcategory");

const ExtraCategory = require("../models/ExtraCategory");

const Brand = require("../models/Brand");

module.exports.add_brand = async (req, res) => {
    try {
        let categoryData = await Category.find({});
        let subcategoryData = await Subcategory.find({});
        let extraCategoryData = await ExtraCategory.find({});
        return res.render("admin/add_brand", {
            categoryData: categoryData,
            subcategoryData: subcategoryData,
            extraCategoryData: extraCategoryData,
        });
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.insertBrandData = async (req, res) => {
    try {
        if (req.body) {
            req.body.isActive = true;
            req.body.created_date = new Date().toLocaleString();
            req.body.updated_date = new Date().toLocaleString();
            let brandData = Brand.create(req.body);
            if (brandData) {
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

module.exports.view_brand = async (req, res) => {
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

        let totalBrandData = await Brand.find({
            $or: [
                { brand_name: { $regex: ".*" + search + ".*", $options: "i" } },
            ],
        }).countDocuments();

        let brandData = await Brand.find({
            $or: [
                { brand_name: { $regex: ".*" + search + ".*", $options: "i" } },
            ],
        })
            .limit(perPage)
            .skip(perPage * page)
            .populate("extraCategory")
            .populate("subcategory")
            .populate("category")
            .exec();

        if (brandData) {
            return res.render("admin/view_brand", {
                brandData: brandData,
                search: search,
                totalDocument: Math.ceil(totalBrandData / perPage),
                pageNo: parseInt(page),
            });
        } else {
            console.log("Data not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.updateBrand = async (req, res) => {
    try {
        if (req.query.id) {
            let brandData = await Brand.findById(req.query.id)
                .populate("extraCategory")
                .populate("subcategory")
                .populate("category")
                .exec();
            let categoryData = await Category.find({});
            let subcategoryData = await Subcategory.find({});
            let extraCategoryData = await ExtraCategory.find({});
            // console.log(brandData);
            if (brandData) {
                return res.render("admin/update_brand", {
                    brandData: brandData,
                    categoryData: categoryData,
                    subcategoryData: subcategoryData,
                    extraCategoryData: extraCategoryData,
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

module.exports.editBrandData = async (req, res) => {
    try {
        if (req.body.oldId) {
            let oldData = await Brand.findById(req.body.oldId);
            if (oldData) {
                let brandData = await Brand.findByIdAndUpdate(
                    req.body.oldId,
                    req.body
                );
                if (brandData) {
                    return res.redirect("/admin/brand/view_brand");
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

module.exports.deleteBrand = async (req, res) => {
    try {
        if (req.query.id) {
            let data = await Brand.findByIdAndDelete(req.query.id);
            if (data) {
                return res.redirect("back");
            } else {
                console.log("Brand not deleted");
                return res.redirect("back");
            }
        } else {
            console.log("Brand not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.deactiveBrand = async (req, res) => {
    try {
        if (req.query.id) {
            let data = await Brand.findByIdAndUpdate(req.query.id, {
                isActive: false,
            });
            if (data) {
                return res.redirect("back");
            } else {
                console.log("Brand not deactivate");
                return res.redirect("back");
            }
        } else {
            console.log("Brand not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.activeBrand = async (req, res) => {
    try {
        if (req.query.id) {
            let data = await Brand.findByIdAndUpdate(req.query.id, {
                isActive: true,
            });
            if (data) {
                return res.redirect("back");
            } else {
                console.log("Brand not activate");
                return res.redirect("back");
            }
        } else {
            console.log("Brand not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};
