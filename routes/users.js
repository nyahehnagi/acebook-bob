const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users");

router.get("/", UsersController.Index);
router.get("/new", UsersController.New);
router.get("/:id", UsersController.Show);
router.post("/", UsersController.Create);
router.post("/upload", UsersController.Upload);
router.post("/:id", UsersController.Update);

module.exports = router;
