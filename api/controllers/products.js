const mongoose = require('mongoose');
const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
    Product.find().select('_id name price image').then(r => {
        console.log(r);
        res.status(200).json(r);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};

exports.saveProduct = (req, res, next) => {
    console.log(req.file);

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
        image: req.file.path
    });
    product.save().then(r => {
        console.log(r);
        res.status(201).json(r);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    });
};

exports.getProductById = (req, res, next) => {
    const id = req.params.id;
    Product.findById(id).select('_id name price image').then(r => {
        console.log(r);
        r ? res.status(200).json(r) : res.status(404).json({ error: 'Product not found' });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    });
};

exports.updateProduct = (req, res, next) => {
    const id = req.params.id;
    Product.findByIdAndUpdate(id, req.body).then(r => {
        console.log(r);
        res.status(200).json(r);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};

exports.deleteProduct = (req, res, next) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id).then(r => {
        console.log(r);
        res.status(200).json(r);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};