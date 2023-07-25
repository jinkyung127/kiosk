const express = require("express");
const router = express.Router();

const itemsRouter = require("./items.routes");
const orderItemsRouter = require("./orderItems.routes");

router.use("/items", itemsRouter);
router.use("/:itemId/orderItems", orderItemsRouter);

module.exports = router;
