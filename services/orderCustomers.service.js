const OrderCustomerRepository = require("../repositories/orderCustomers.repository");
const ItemOrderCustomerRepository = require("../repositories/itemOrderCustomers.repository");
const { Items } = require("../models");
const { sequelize } = require("../models");

class OrderCustomerService {
  orderCustomerRepository = new OrderCustomerRepository();
  itemOrderCustomerRepository = new ItemOrderCustomerRepository();

  createOrderCustomer = async (customerId, orderItems) => {
    let totalAmount = 0;
    const createdOrderCustomer =
      await this.orderCustomerRepository.createOrderCustomer();

    for (const orderItem of orderItems) {
      const { itemId, amount } = orderItem;

      const item = await Items.findByPk(itemId);

      if (!item) {
        throw new Error("해당하는 상품이 없습니다.");
      }

      totalAmount += item.price * amount;

      const itemOrderCustomerData = {
        itemId: itemId,
        orderCustomerId: createdOrderCustomer.id,
        amount: amount,
      };

      await this.itemOrderCustomerRepository.createItemOrderCustomer(
        itemOrderCustomerData
      );
    }

    return totalAmount;
  };

  // 주문 완료 메서드
  completeOrder = async (id) => {
    // 트랜잭션 시작
    const t = await sequelize.transaction();

    try {
      // 주문 사용자의 상태(state)를 true로 변경
      await this.orderCustomerRepository.updateOrderCustomerState(id);

      // 주문한 상품들의 재고 감소 작업
      const orderItems =
        await this.itemOrderCustomerRepository.getItemsByOrderCustomerId(id);

      for (const orderItem of orderItems) {
        const { itemId, amount } = orderItem;

        const item = await Items.findByPk(itemId, { transaction: t });

        item.amount -= amount;
        await item.save({ transaction: t });
      }

      // 트랜잭션 커밋
      await t.commit();

      // 주문한 상품들의 총 가격을 계산하여 반환
      const totalAmount = orderItems.reduce(
        (sum, item) => sum + item.price * item.amount,
        0
      );
      return totalAmount;
    } catch (error) {
      // 트랜잭션 롤백
      await t.rollback();
      throw error;
    }
  };

  // 주문 취소 메서드
  // cancelOrder = async (orderCustomerId) => {
  //   // 트랜잭션 시작
  //   const t = await sequelize.transaction();

  //   try {
  //     // 주문 사용자 데이터 조회
  //     const orderCustomer =
  //       await this.orderCustomerRepository.getOrderCustomerById(
  //         orderCustomerId
  //       );

  //     // 주문이 이미 완료된 경우 에러 발생
  //     if (orderCustomer.state === true) {
  //       throw new Error("완료된 주문은 취소할 수 없습니다.");
  //     }

  //     // 주문 사용자와 관련된 데이터 삭제
  //     await this.orderCustomerRepository.deleteOrderCustomer(orderCustomerId, {
  //       transaction: t,
  //     });
  //     await this.itemOrderCustomerRepository.deleteItemsByOrderCustomerId(
  //       orderCustomerId,
  //       { transaction: t }
  //     );

  //     // 트랜잭션 커밋
  //     await t.commit();
  //   } catch (error) {
  //     // 트랜잭션 롤백
  //     await t.rollback();
  //     throw error;
  //   }
  // };
}

module.exports = OrderCustomerService;
