const express = require("express");
const router = express.Router();

const OrderCustomersController = require("../controllers/orderCustomers.controller");
const orderCustomersController = new OrderCustomersController();

router.post("/", orderCustomersController.createOrderCustomer);
router.put("/:id/complete", orderCustomersController.completeOrder);
// router.delete("/:id/cancel", orderCustomersController.cancelOrder);

module.exports = router;
