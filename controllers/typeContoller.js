const Category = require("../models/Category");

const ExtraCategory = require("../models/ExtraCategory");

const Subcategory = require("../models/Subcategory");

const Type = require("../models/Type");

module.exports.add_type = async (req, res) => {
    try {
        let categoryData = await Category.find({});
        let subcategoryData = await Subcategory.find({});
        let extraCategoryData = await ExtraCategory.find({});
        return res.render("admin/add_type", {
            categoryData: categoryData,
            subcategoryData: subcategoryData,
            extraCategoryData: extraCategoryData,
        });
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.insertTypeData = async (req, res) => {
    try {
        if (req.body) {
            req.body.isActive = true;
            req.body.created_date = new Date().toLocaleString();
            req.body.updated_date = new Date().toLocaleString();
            let typeData = await Type.create(req.body);
            if (typeData) {
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

module.exports.view_type = async (req, res) => {
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

        let totalTypeData = await Type.find({
            $or: [{ type: { $regex: ".*" + search + ".*", $options: "i" } }],
        }).countDocuments();

        let typeData = await Type.find({
            $or: [{ type: { $regex: ".*" + search + ".*", $options: "i" } }],
        })
            .populate("extraCategory")
            .populate("subcategory")
            .populate("category")
            .exec();
        return res.render("admin/view_type", {
            typeData: typeData,
            search: search,
            totalDocument: Math.ceil(totalTypeData / perPage),
            pageNo: parseInt(page),
        });
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.updateType = async (req, res) => {
    try {
        if (req.query.id) {
            let typeData = await Type.findById(req.query.id)
                .populate("extraCategory")
                .populate("subcategory")
                .populate("category")
                .exec();
            let categoryData = await Category.find({});
            let subcategoryData = await Subcategory.find({});
            let extraCategoryData = await ExtraCategory.find({});
            // console.log(typeData);
            if (typeData) {
                return res.render("admin/update_type", {
                    typeData: typeData,
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

module.exports.editTypeData = async (req, res) => {
    try {
        if (req.body.oldId) {
            let oldData = await Type.findById(req.body.oldId);
            if (oldData) {
                let typeData = await Type.findByIdAndUpdate(
                    req.body.oldId,
                    req.body
                );
                if (typeData) {
                    return res.redirect("/admin/type/view_type");
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

module.exports.deleteType = async (req, res) => {
    try {
        if (req.query.id) {
            let data = await Type.findByIdAndDelete(req.query.id);
            if (data) {
                return res.redirect("back");
            } else {
                console.log("Type not deleted");
                return res.redirect("back");
            }
        } else {
            console.log("Type not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.deactiveType = async (req, res) => {
    try {
        if (req.query.id) {
            let data = await Type.findByIdAndUpdate(req.query.id, {
                isActive: false,
            });
            if (data) {
                return res.redirect("back");
            } else {
                console.log("Type not deactivate");
                return res.redirect("back");
            }
        } else {
            console.log("Type not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.activeType = async (req, res) => {
    try {
        if (req.query.id) {
            let data = await Type.findByIdAndUpdate(req.query.id, {
                isActive: true,
            });
            if (data) {
                return res.redirect("back");
            } else {
                console.log("Type not activate");
                return res.redirect("back");
            }
        } else {
            console.log("Type not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};
