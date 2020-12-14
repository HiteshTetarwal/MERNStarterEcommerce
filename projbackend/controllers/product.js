const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { privateDecrypt } = require("crypto");


exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err){
            return res.status(400).json({
                error : "Product not found"
            })
        }
        req.product = product;
        next();
    });
};

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error : "problem with image"
            })
        }

        //destructure the fiels
        const { name, description, price, category, stock } = fields

        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ){
            return res.status(400).json({
                error : "Please include all fields"
            });
        }

        //Can be done: restrictions on field to ensure the data is according to your choice
        let product = new Product(fields)

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File size too big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type;            
        }

        //save to the DB
        product.save((err, product) => {
            if(err){
                res.status(400).json({
                    error : "Saving tshirt in DB failed"
                })
            }
            res.json(product);
        })
    });
};

exports.getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

//middleware
exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}

//delete controllers
exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error : "Failed to delete the product"
            })
        }
        res.json({
            message : "Deletion was a success",
            deleteProduct
        })
    })
}

//update controllers
exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error : "problem with image"
            })
        }

        let product = req.product;
        product = _.extend(product, fields) //check this method: lodash is used

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File size too big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type;            
        }

        //save to the DB
        product.save((err, product) => {
            if(err){
                res.status(400).json({
                    error : "Updation of product failed"
                })
            }
            res.json(product);
        })
    }); 
}