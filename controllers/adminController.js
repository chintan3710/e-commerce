const fs = require("fs");

const path = require("path");

const nodemailer = require("nodemailer");

const Admin = require("../models/Admin");

module.exports.admin = async (req, res) => {
    try {
        let data = res.locals.user;
        if (data) {
            return res.redirect("/admin/dashboard");
        } else {
            return res.render("admin/login_admin");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.dashboard = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            return res.render("admin/dashboard");
        } else {
            return res.redirect("/admin/");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.add_admin = async (req, res) => {
    try {
        return res.render("admin/add_admin");
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.insertAdminData = async (req, res) => {
    try {
        let imagePath = "";
        let fullname = "";
        if (req.file) {
            imagePath = Admin.imageModelPath + "/" + req.file.filename;
            if (req.body) {
                fullname = req.body.fname + " " + req.body.lname;
                req.body.name = fullname;
                req.body.adminImage = imagePath;
                req.body.isActive = true;
                req.body.created_date = new Date().toLocaleString();
                req.body.updated_date = new Date().toLocaleString();
                let adminData = await Admin.create(req.body);
                if (adminData) {
                    console.log("Data inserted successfully");
                    return res.redirect("back");
                } else {
                    console.log("Data not insert");
                    return res.redirect("back");
                }
            } else {
                console.log("Data not found");
                return res.redirect("back");
            }
        } else {
            console.log("Image not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.view_admin = async (req, res) => {
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

        let totalAdminData = await Admin.find({
            $or: [
                { name: { $regex: ".*" + search + ".*", $options: "i" } },
                { email: { $regex: ".*" + search + ".*", $options: "i" } },
            ],
        }).countDocuments();

        let adminData = await Admin.find({
            $or: [
                { name: { $regex: ".*" + search + ".*", $options: "i" } },
                { email: { $regex: ".*" + search + ".*", $options: "i" } },
            ],
        })
            .limit(perPage)
            .skip(perPage * page);

        if (adminData) {
            return res.render("admin/view_admin", {
                adminData: adminData,
                search: search,
                totalDocument: Math.ceil(totalAdminData / perPage),
                pageNo: parseInt(page),
            });
        } else {
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.loginAdmin = async (req, res) => {
    try {
        return res.redirect("/admin/dashboard");
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.profile_admin = async (req, res) => {
    try {
        let adminData = await Admin.find({});
        if (adminData) {
            return res.render("admin/profile_admin", {
                adminData: adminData,
            });
        } else {
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.logout_admin = async (req, res) => {
    try {
        res.clearCookie("e-com");
        return res.redirect("/admin");
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.editProfile = async (req, res) => {
    try {
        let oldData = await Admin.findById(req.body.oldId);
        if (req.file) {
            if (oldData.adminImage) {
                let fullPath = path.join(__dirname, ".." + oldData.adminImage);
                await fs.unlinkSync(fullPath);
            }
            let imagePath = "";
            imagePath = Admin.imageModelPath + "/" + req.file.filename;
            req.body.adminImage = imagePath;
        } else {
            req.body.adminImage = oldData.adminImage;
        }
        req.body.name = req.body.fname + " " + req.body.lname;
        await Admin.findByIdAndUpdate(req.body.oldId, req.body);
        let adminData = await Admin.findById(req.body.oldId);
        res.locals.user = adminData;
        return res.redirect("back");
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.updateAdmin = async (req, res) => {
    try {
        if (req.query.id) {
            let adminData = await Admin.findById(req.query.id);
            return res.render("admin/update_admin", {
                adminData: adminData,
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

module.exports.editAdminData = async (req, res) => {
    try {
        let oldData = await Admin.findById(req.body.oldId);
        if (req.file) {
            if (oldData.adminImage) {
                let fullPath = path.join(__dirname, ".." + oldData.adminImage);
                await fs.unlinkSync(fullPath);
            }
            let imagePath = "";
            imagePath = Admin.imageModelPath + "/" + req.file.filename;
            req.body.adminImage = imagePath;
            res.locals.user.adminImage = imagePath;
        } else {
            req.body.adminImage = oldData.adminImage;
        }
        req.body.name = req.body.fname + " " + req.body.lname;
        await Admin.findByIdAndUpdate(req.body.oldId, req.body);
        let adminData = await Admin.findById(req.body.oldId);
        res.locals.user = adminData;
        return res.redirect("/admin/view_admin");
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.deleteAdmin = async (req, res) => {
    try {
        if (req.query.id) {
            let oldData = await Admin.findById(req.query.id);
            if (oldData) {
                if (oldData.adminImage) {
                    let fullPath = path.join(
                        __dirname,
                        ".." + oldData.adminImage
                    );
                    await fs.unlinkSync(fullPath);
                } else {
                    console.log("Admin  image not found");
                }
            } else {
                console.log("Admin not found");
            }
            let data = await Admin.findByIdAndDelete(req.query.id);
            console.log(data);
            if (data) {
                return res.redirect("back");
            } else {
                console.log("Admin not delete");
                return res.redirect("back");
            }
        } else {
            console.log("Admin not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.deactiveAdmin = async (req, res) => {
    try {
        if (req.query.id) {
            let data = await Admin.findByIdAndUpdate(req.query.id, {
                isActive: false,
            });
            if (data) {
                return res.redirect("back");
            } else {
                console.log("Admin not deactivate");
                return res.redirect("back");
            }
        } else {
            console.log("Admin not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.activeAdmin = async (req, res) => {
    try {
        if (req.query.id) {
            let data = await Admin.findByIdAndUpdate(req.query.id, {
                isActive: true,
            });
            if (data) {
                return res.redirect("back");
            } else {
                console.log("Admin not activate");
                return res.redirect("back");
            }
        } else {
            console.log("Admin not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.updatePassword = async (req, res) => {
    try {
        return res.render("admin/update_password");
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.editPassword = async (req, res) => {
    try {
        let loginData = res.locals.user;
        if (loginData.password == req.body.old_password) {
            if (loginData.password != req.body.new_password) {
                if (req.body.new_password == req.body.confirm_password) {
                    let adminData = await Admin.findById(loginData._id);
                    if (adminData) {
                        let editedPassword = await Admin.findByIdAndUpdate(
                            adminData.id,
                            { password: req.body.new_password }
                        );
                        if (editedPassword) {
                            return res.redirect("/admin/logout_admin");
                        } else {
                            console.log("Password not edited");
                            return res.redirect("back");
                        }
                    } else {
                        console.log("Data not found");
                        return res.redirect("back");
                    }
                } else {
                    console.log("Confirm password not match");
                    return res.redirect("back");
                }
            } else {
                console.log("This is passeord is already used");
                return res.redirect("back");
            }
        } else {
            console.log("Old password is incorrect");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.mailPage = async (req, res) => {
    try {
        return res.render("admin/mailPage");
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.checkMail = async (req, res) => {
    try {
        // console.log(req.body);
        if (req.body) {
            let checkMail = await Admin.findOne({ email: req.body.email });
            let otp = Math.round(100000 + Math.random() * 999999);
            if (otp.leangth > 6) {
                otp = otp.slice(0, -1);
            }
            if (checkMail) {
                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: "chintanrajpara34@gmail.com",
                        pass: "sbvtwryilxddkphx",
                    },
                });
                const info = await transporter.sendMail({
                    from: "chintanrajpara34@gmail.com",
                    to: req.body.email,
                    subject: "OTP",
                    text: "Your OTP is here!",
                    html: `<b>${otp}</b>`,
                });
                res.cookie("email", req.body.email);
                res.cookie("otp", otp);
                if (info) {
                    console.log("Check your mail");
                    return res.redirect("/admin/checkOTP");
                } else {
                    console.log("Something went wrong");
                    return res.redirect("back");
                }
            } else {
                console.log("Invalid email");
                return res.redirect("back");
            }
        } else {
            console.log("Enter your email");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.checkOTP = async (req, res) => {
    try {
        return res.render("admin/checkOTP");
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.verifyOTP = async (req, res) => {
    try {
        let otp = "";
        req.body.otp.map((v, i) => {
            otp += v;
        });
        // console.log(otp);
        if (otp == req.cookies.otp) {
            return res.redirect("/admin/changePass");
        } else {
            console.log("Invalid OTP");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.changePass = async (req, res) => {
    try {
        return res.render("admin/changePass");
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.verifyPass = async (req, res) => {
    try {
        let checkMail = await Admin.findOne({ email: req.cookies.email });
        if (checkMail) {
            if (checkMail.password == req.body.new_password) {
                console.log("This password is already used");
                return res.redirect("back");
            } else {
                let updateData = await Admin.findByIdAndUpdate(checkMail.id, {
                    password: req.body.new_password,
                });
                if (updateData) {
                    console.log("Password updated successfully");
                    return res.redirect("/admin");
                } else {
                    console.log("Password not updated");
                    return res.redirect("back");
                }
            }
        } else {
            console.log("Invalid email");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};
