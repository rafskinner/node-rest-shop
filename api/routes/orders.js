const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/check-auth');
const orderController = require('../controllers/orders');

router.get('/', checkAuth, orderController.getAllOrders);

router.post('/', checkAuth, orderController.saveOrder);

router.get('/:id', checkAuth, orderController.getOrderById);

router.delete('/:id', checkAuth, orderController.deleteOrder);

module.exports = router;