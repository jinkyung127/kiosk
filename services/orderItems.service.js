const OrderItemRepository = require("../repositories/items.repository");

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
    await this.itemRepository.updateItem(id, state);
    const updateOrderItem = await this.orderItemRepository.findOrderItemById(
      id
    );

    return updateOrderItem;
  };
}

module.exports = OrderItemService;
