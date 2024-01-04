const express = require("express");

const typeContoller = require("../controllers/typeContoller");

const routes = express.Router();

routes.get("/add_type", typeContoller.add_type);

routes.post("/insertTypeData", typeContoller.insertTypeData);

routes.get("/view_type", typeContoller.view_type);

routes.get("/updateType", typeContoller.updateType);

routes.post("/editTypeData", typeContoller.editTypeData);

routes.get("/deleteType", typeContoller.deleteType);

routes.get("/deactiveType", typeContoller.deactiveType);

routes.get("/activeType", typeContoller.activeType);

module.exports = routes;
