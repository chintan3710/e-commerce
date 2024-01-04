const express = require("express");

const Passport = require("passport");

const adminController = require("../controllers/adminController");

const Admin = require("../models/Admin");

const routes = express.Router();

routes.get("/", adminController.admin);

routes.get("/dashboard", Passport.checkAuth, adminController.dashboard);

routes.get("/add_admin", Passport.checkAuth, adminController.add_admin);

routes.post(
    "/insertAdminData",
    Admin.adminUploadImage,
    adminController.insertAdminData
);

routes.get("/view_admin", Passport.checkAuth, adminController.view_admin);

routes.post(
    "/loginAdmin",
    Passport.authenticate("local", { failureRedirect: "/admin" }),
    adminController.loginAdmin
);

routes.get("/profile_admin", Passport.checkAuth, adminController.profile_admin);

routes.get("/logout_admin", Passport.checkAuth, adminController.logout_admin);

routes.post(
    "/editProfile",
    Admin.adminUploadImage,
    adminController.editProfile
);

routes.get("/updateAdmin", Passport.checkAuth, adminController.updateAdmin);

routes.post(
    "/editAdminData",
    Admin.adminUploadImage,
    adminController.editAdminData
);

routes.get("/deleteAdmin", Passport.checkAuth, adminController.deleteAdmin);

routes.get("/deactiveAdmin", Passport.checkAuth, adminController.deactiveAdmin);

routes.get("/activeAdmin", Passport.checkAuth, adminController.activeAdmin);

routes.get(
    "/updatePassword",
    Passport.checkAuth,
    adminController.updatePassword
);

routes.post("/editPassword", Passport.checkAuth, adminController.editPassword);

routes.get("/mailPage", adminController.mailPage);

routes.post("/checkMail", adminController.checkMail);

routes.get("/checkOTP", adminController.checkOTP);

routes.post("/verifyOTP", adminController.verifyOTP);

routes.get("/changePass", adminController.changePass);

routes.post("/verifyPass", adminController.verifyPass);

routes.use("/category", Passport.checkAuth, require("./category"));

routes.use("/subcategory", Passport.checkAuth, require("./subcategory"));

routes.use("/extraCategory", Passport.checkAuth, require("./extraCategory"));

routes.use("/brand", Passport.checkAuth, require("./brand"));

routes.use("/type", Passport.checkAuth, require("./type"));

routes.use("/product", Passport.checkAuth, require("./product"));

module.exports = routes;
