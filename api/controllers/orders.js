const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

exports.getAllOrders = (req, res, next) => {
    Order.find().select('_id quantity product').populate('product', '_id name price image').then(r => {
        console.log(r);
        res.status(200).json(r);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};

exports.saveOrder = (req, res, next) => {
    Product.findById(req.body.product).then(r => {
        console.log(r);
        if (r) {
            return new Order({
                _id: mongoose.Types.ObjectId(),
                ...req.body
            }).save();
        }
        throw new Error('Product not found');
    }).then(r => {
        console.log(r);
        res.status(201).json(r);
    }).catch(err => {
        console.log(err);
        err.message.includes('not found') ? res.status(404) : res.status(500);
        res.json({ error: err });
    });
};

exports.getOrderById = (req, res, next) => {
    const id = req.params.id;
    Order.findById(id).select('_id quantity product').populate('product', '_id name price image').then(r => {
        console.log(r);
        r ? res.status(200).json(r) : res.status(404).json({ error: 'Order not found' });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};

exports.deleteOrder = (req, res, next) => {
    const id = req.params.id;
    Order.findByIdAndDelete(id).then(r => {
        console.log(r);
        res.status(200).json(r);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};