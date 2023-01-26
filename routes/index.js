const router = require("express").Router();
const apiRoutes = require("./api/project-routes");

router.use(apiRoutes);

module.exports = router;
