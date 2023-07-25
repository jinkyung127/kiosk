const OrderItemRepository = require("../repositories/orderItems.repository");

class OrderItemService {
  orderItemRepository = new OrderItemRepository();

  createOrderItem = async (itemId, amount, state) => {
    const createOrderItemData = await this.orderItemRepository.createOrderItem(
      itemId,
      amount,
      state
    );

    return createOrderItemData;
  };

  updateOrderItem = async (id, state) => {
    await this.orderItemRepository.updateItem(id, state);
    const updateOrderItem = await this.orderItemRepository.findOrderItemById(
      id
    );

    if (state == "completed") return updateOrderItem;
  };
}

module.exports = OrderItemService;
