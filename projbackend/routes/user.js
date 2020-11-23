const express = require("express");
const { isAuthenticated, isSignedIn, isAdmin } = require("../controllers/auth");
const { getUserById, getUser, updateUser } = require("../controllers/user");
const { route } = require("./auth");

var router = express.Router();

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

// exercise route
// router.get("/users", getAllUsers);
module.exports = router;