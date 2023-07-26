const OrderItemRepository = require("../repositories/orderItems.repository");
const ItemRepository = require("../repositories/items.repository");
const { sequelize } = require("../models");

class OrderItemService {
  orderItemRepository = new OrderItemRepository();
  itemRepository = new ItemRepository();

  createOrderItem = async (itemId, amount, state) => {
    const createOrderItemData = await this.orderItemRepository.createOrderItem(
      itemId,
      amount,
      state
    );

    return createOrderItemData;
  };

  updateOrderItem = async (id, state) => {
    const orderitem = await this.orderItemRepository.findOrderItemById(id);
    const prevState = orderitem.state;

    if (prevState === "ORDERED" && state === "PENDING") {
      return this.orderItemRepository.updateOrderItem(id, state);
    } else if (
      (prevState === "ORDERED" || prevState === "PENDING") &&
      state === "CANCELED"
    ) {
      return this.orderItemRepository.updateOrderItem(id, state);
    } else if (
      (prevState === "ORDERED" || prevState === "PENDING") &&
      state === "COMPLETED"
    ) {
      const t = await sequelize.transaction();
      try {
        // 발주 정보 업데이트
        await this.orderItemRepository.updateOrderItem(id, state, {
          transaction: t,
        });

        // 발주 정보 조회
        const updatedOrderItem =
          await this.orderItemRepository.findOrderItemById(id, {
            transaction: t,
          });

        // 상품의 수량 업데이트
        await this.itemRepository.updateItemAmount(
          updatedOrderItem.itemId,
          updatedOrderItem.amount,
          { transaction: t }
        );

        await t.commit();
        return updatedOrderItem;
      } catch (error) {
        await t.rollback();
        throw error;
      }
    } else if (
      prevState === "COMPLETED" &&
      (state === "CANCELED" || state === "PENDING" || state === "ORDERED")
    ) {
      const t = await sequelize.transaction();
      try {
        // 발주 정보 업데이트
        await this.orderItemRepository.updateOrderItem(id, state, {
          transaction: t,
        });

        // 발주 정보 조회
        const updatedOrderItem =
          await this.orderItemRepository.findOrderItemById(id, {
            transaction: t,
          });

        // 상품의 수량 업데이트
        await this.itemRepository.cancelItemAmount(
          updatedOrderItem.itemId,
          updatedOrderItem.amount,
          { transaction: t }
        );

        await t.commit();
        return updatedOrderItem;
      } catch (error) {
        await t.rollback();
        throw error;
      }
    } else {
      // 다른 상태일 경우 그냥 발주 정보만 업데이트
      return this.orderItemRepository.updateOrderItem(id, state);
    }
  };
}

module.exports = OrderItemService;
