const { UnauthorizedError } = require("express-jwt");
const order = require("../models/order");
const { Order } = require("../models/order");
const User = require("../models/user");


exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error : "User not found"
            })
        }
        req.profile = user;
        next();
    })
}

exports.getUser = (req, res) => {
    //TODO: get back here for password
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if(err) {
                return res.status(400).json({
                    error : "You are not authorized to update the user info"
                });
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user)
        }
    )
}

exports.userPurchaseList = (req,res) => {
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "No Order in this account"
            })
        }
        return res.json(order);
    })
}
// exercise file
// exports.getAllUsers = (req, res) => {
//     User.find({}, function(err, users) {
//         var userMap = {};
    
//         users.forEach(function(user) {
//           userMap[user._id] = user;
//         });

//     return res.send(userMap)
//     })
// }