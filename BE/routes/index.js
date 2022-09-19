const express = require("express");
const router = express.Router();
const Crud = require("./routes");

router.use("/crud", Crud);

module.exports = router;
