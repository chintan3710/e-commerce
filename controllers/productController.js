const Brand = require("../models/Brand");

const Category = require("../models/Category");

const ExtraCategory = require("../models/ExtraCategory");

const Product = require("../models/Product");

const Subcategory = require("../models/Subcategory");

const Type = require("../models/Type");

module.exports.add_product = async (req, res) => {
    try {
        let categoryData = await Category.find({});
        let subcategoryData = await Subcategory.find({});
        let extraCategoryData = await ExtraCategory.find({});
        let brandData = await Brand.find({});
        let typeData = await Type.find({});
        return res.render("admin/add_product", {
            categoryData: categoryData,
            subcategoryData: subcategoryData,
            extraCategoryData: extraCategoryData,
            brandData: brandData,
            typeData: typeData,
        });
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.insertProductData = async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.files);
        let imagePath = "";
        let imageMulPath = [];
        if (req.files) {
            imagePath =
                Product.imageModelPath +
                "/" +
                req.files.productImage[0].filename;
            req.files.productMulImage.map((v, i) => {
                imageMulPath.push(Product.imageModelMulPath + "/" + v.filename);
            });
            if (req.body) {
                req.body.productImage = imagePath;
                req.body.productMulImage = imageMulPath;
                req.body.isActive = true;
                req.body.created_date = new Date().toLocaleString();
                req.body.updated_date = new Date().toLocaleString();
                let productData = await Product.create(req.body);
                if (productData) {
                    return res.redirect("back");
                } else {
                    console.log("Product not inserted");
                    return res.redirect("back");
                }
            } else {
                console.log("Data not found");
                return res.redirect("back");
            }
        } else {
            console.log("Images not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.view_product = async (req, res) => {
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

        let totalProductData = await Product.find({
            $or: [
                {
                    product_title: {
                        $regex: ".*" + search + ".*",
                        $options: "i",
                    },
                },
            ],
        }).countDocuments();

        let productData = await Product.find({
            $or: [
                {
                    product_title: {
                        $regex: ".*" + search + ".*",
                        $options: "i",
                    },
                },
            ],
        })
            .limit(perPage)
            .skip(perPage * page)
            .populate("extraCategory")
            .populate("subcategory")
            .populate("category")
            .exec();
        // console.log(productData);
        if (productData) {
            return res.render("admin/view_product", {
                productData: productData,
                search: search,
                totalDocument: Math.ceil(totalProductData / perPage),
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

module.exports.view_single_product = async (req, res) => {
    try {
        console.log(req.query.id);
        if (req.query.id) {
            let singleProductData = await Product.findById(req.query.id);
            console.log(singleProductData);
            if (singleProductData) {
                return res.render("admin/view_single_product", {
                    singleProductData: singleProductData,
                });
            } else {
                console.log("Product not found");
                return res.redirect("back");
            }
        } else {
            console.log("Invalid parameters");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};
