const Category = require("../models/Category");

module.exports.add_category = async (req, res) => {
    try {
        return res.render("admin/add_category");
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.insertCategoryData = async (req, res) => {
    try {
        if (req.body) {
            req.body.isActive = true;
            req.body.created_date = new Date().toLocaleString();
            req.body.updated_date = new Date().toLocaleString();
            let categoryData = await Category.create(req.body);
            if (categoryData) {
                console.log("Data inserted successfully");
                return res.redirect("back");
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

module.exports.view_category = async (req, res) => {
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

        let totalCategoryData = await Category.find({
            $or: [
                {
                    category_name: {
                        $regex: ".*" + search + ".*",
                        $options: "i",
                    },
                },
            ],
        }).countDocuments();

        let categoryData = await Category.find({
            $or: [
                {
                    category_name: {
                        $regex: ".*" + search + ".*",
                        $options: "i",
                    },
                },
            ],
        })
            .limit(perPage)
            .skip(perPage * page);

        if (categoryData) {
            return res.render("admin/view_category", {
                categoryData: categoryData,
                search: search,
                totalDocument: Math.ceil(totalCategoryData / perPage),
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

module.exports.updateCategory = async (req, res) => {
    try {
        if (req.query.id) {
            let categoryData = await Category.findById(req.query.id);
            if (categoryData) {
                return res.render("admin/update_category", {
                    categoryData: categoryData,
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

module.exports.editCategoryData = async (req, res) => {
    try {
        // console.log(req.body.oldId);
        if (req.body.oldId) {
            let oldData = await Category.findById(req.body.oldId);
            if (oldData) {
                let updatedData = await Category.findByIdAndUpdate(
                    req.body.oldId,
                    req.body
                );
                if (updatedData) {
                    return res.redirect("/admin/category/view_category");
                } else {
                    console.log("Data not updated");
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

module.exports.deleteCategory = async (req, res) => {
    try {
        if (req.query.id) {
            let data = await Category.findByIdAndDelete(req.query.id);
            console.log(data);
            if (data) {
                return res.redirect("back");
            } else {
                console.log("Category not delete");
                return res.redirect("back");
            }
        } else {
            console.log("Category not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.deactiveCategory = async (req, res) => {
    try {
        if (req.query.id) {
            let data = await Category.findByIdAndUpdate(req.query.id, {
                isActive: false,
            });
            if (data) {
                return res.redirect("back");
            } else {
                console.log("Category not deactivate");
                return res.redirect("back");
            }
        } else {
            console.log("Category not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.activeCategory = async (req, res) => {
    try {
        if (req.query.id) {
            let data = await Category.findByIdAndUpdate(req.query.id, {
                isActive: true,
            });
            if (data) {
                return res.redirect("back");
            } else {
                console.log("Category not activate");
                return res.redirect("back");
            }
        } else {
            console.log("Category not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};
