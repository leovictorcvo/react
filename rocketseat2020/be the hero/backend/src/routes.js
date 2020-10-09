const express = require("express");

const IncidentController = require("./controllers/IncidentController");
const OngController = require("./controllers/OngController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

routes.get("/incidents", IncidentController.list);
routes.post("/incidents", IncidentController.create);
routes.delete("/incidents/:id", IncidentController.delete);

routes.get("/ongs", OngController.list);
routes.post("/ongs", OngController.create);

routes.get("/profile", ProfileController.index);

routes.post("/sessions", SessionController.create);

module.exports = routes;
