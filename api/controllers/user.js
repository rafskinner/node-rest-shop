const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signupUser = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(r => {
        if (r) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });
            user.save().then(r => {
                console.log(r);
                res.status(201).json(r);
            }).catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};

exports.loginUser = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(r => {
        if (!r) {
            return res.status(401).json({ message: 'Wrong email/password' });
        }
        bcrypt.compare(req.body.password, r.password, (err, result) => {
            if (err) {
                return res.status(401).json({ message: 'Operation failed' });
            }
            if (result) {
                const token = jwt.sign({
                    email: r.email,
                    id: r._id
                }, process.env.JWT_KEY, { expiresIn: "1h" });
                return res.status(200).json({ token, message: 'Authenticated' });
            }
            return res.status(401).json({ message: 'Wrong email/password' });
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};

exports.deleteUser = (req, res, next) => {
    const id = req.params.id;
    User.findByIdAndDelete(id).then(r => {
        console.log(r);
        res.status(200).json(r);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};