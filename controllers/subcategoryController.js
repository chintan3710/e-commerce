const Category = require("../models/Category");

const Subcategory = require("../models/Subcategory");

module.exports.add_subcategory = async (req, res) => {
    try {
        const categoryData = await Category.find({});
        return res.render("admin/add_subcategory", {
            categoryData: categoryData,
        });
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.insertSubcategoryData = async (req, res) => {
    try {
        if (req.body) {
            req.body.isActive = true;
            req.body.created_date = new Date().toLocaleString();
            req.body.updated_date = new Date().toLocaleString();
            let subcategoryData = Subcategory.create(req.body);
            if (subcategoryData) {
                return res.redirect("back");
            } else {
                console.log("Data not inserted");
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

module.exports.view_subcategory = async (req, res) => {
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

        let totalSubcatData = await Subcategory.find({
            $or: [
                {
                    subcategory_name: {
                        $regex: ".*" + search + ".*",
                        $options: "i",
                    },
                },
            ],
        }).countDocuments();

        let subcategoryData = await Subcategory.find({
            $or: [
                {
                    subcategory_name: {
                        $regex: ".*" + search + ".*",
                        $options: "i",
                    },
                },
            ],
        })
            .limit(perPage)
            .skip(perPage * page)
            .populate("category")
            .exec();

        if (subcategoryData) {
            return res.render("admin/view_subcategory", {
                subcategoryData: subcategoryData,
                search: search,
                totalDocument: Math.ceil(totalSubcatData / perPage),
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

module.exports.updateSubcategory = async (req, res) => {
    try {
        if (req.query.id) {
            let subcategoryData = await Subcategory.findById(req.query.id)
                .populate("category")
                .exec();
            let categoryData = await Category.find({});
            // console.log(subcategoryData);
            return res.render("admin/update_subcategory", {
                subcategoryData: subcategoryData,
                categoryData: categoryData,
            });
        } else {
            console.log("Invalid request");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.editSubcategoryData = async (req, res) => {
    try {
        if (req.body.oldId) {
            let oldData = await Subcategory.findById(req.body.oldId);
            if (oldData) {
                let subcategoryData = await Subcategory.findByIdAndUpdate(
                    req.body.oldId,
                    req.body
                );
                if (subcategoryData) {
                    // console.log("Data updated successfully");
                    return res.redirect("/admin/subcategory/view_subcategory");
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

module.exports.deleteSubcategory = async (req, res) => {
    try {
        if (req.query.id) {
            let data = await Subcategory.findByIdAndDelete(req.query.id);
            // console.log(data);
            if (data) {
                return res.redirect("back");
            } else {
                console.log("Subcategory not delete");
                return res.redirect("back");
            }
        } else {
            console.log("Subcategory not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.deactiveSubcategory = async (req, res) => {
    try {
        if (req.query.id) {
            let data = await Subcategory.findByIdAndUpdate(req.query.id, {
                isActive: false,
            });
            if (data) {
                return res.redirect("back");
            } else {
                console.log("Subcategory not deactivate");
                return res.redirect("back");
            }
        } else {
            console.log("Subcategory not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.activeSubcategory = async (req, res) => {
    try {
        if (req.query.id) {
            let data = await Subcategory.findByIdAndUpdate(req.query.id, {
                isActive: true,
            });
            if (data) {
                return res.redirect("back");
            } else {
                console.log("Subcategory not activate");
                return res.redirect("back");
            }
        } else {
            console.log("Subcategory not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};
