const router = require('express').Router();
const userController = require('../controllers/users.controller');
const auth = require("../filters/auth");

router.get("/", auth, userController.getUsers);
router.get("/:id", auth, userController.getUser);
router.post("/", auth, userController.addUser);
router.post("/login",  userController.loginUser);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.removeUser);


module.exports = router;