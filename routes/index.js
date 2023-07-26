const express = require("express");
const router = express.Router();

const itemsRouter = require("./items.routes");
const orderItemsRouter = require("./orderItems.routes");
const orderCustomersRouter = require("./orderCustomers.routes");
const optionsRouter = require("./options.routes");

router.use("/items", itemsRouter);
router.use("/orderItems", orderItemsRouter);
router.use("/orderCustomers", orderCustomersRouter);
router.use("/options", optionsRouter);

module.exports = router;
