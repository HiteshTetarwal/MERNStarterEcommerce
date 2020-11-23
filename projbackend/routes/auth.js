var express = require("express");
const { check, validationResult } = require("express-validator");
var router = express.Router();
const {signout, signup, signin, isSignedIn} = require("../controllers/auth")


router.post("/signin",[
    check("email", "email is required").isEmail(),
    check("password", "Password field is required").isLength({min:1})
], signin);

router.post("/signup",[
    check("name", "name should be at least 3 char").isLength({min:3}),
    check("email", "email is required").isEmail(),
    check("password", "password should be atleast 3 char").isLength({min:3})
], signup);

router.get("/signout", signout);

router.get("/testroute", isSignedIn , (req,res)=> {
    res.json(req.auth);
});

module.exports = router;