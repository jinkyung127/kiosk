const express = require("express");
const router = express.Router();

const OrderItemsController = require("../controllers/orderItems.controller");
const orderItemsController = new OrderItemsController();

router.post("/", orderItemsController.createOrderItem);
router.put("/:id", orderItemsController.updateOrderItem);

module.exports = router;
