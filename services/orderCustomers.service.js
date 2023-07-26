const OrderCustomerRepository = require("../repositories/orderCustomers.repository");
const ItemOrderCustomerRepository = require("../repositories/itemOrderCustomers.repository");
const ItemRepository = require("../repositories/items.repository");
const { Items } = require("../models");
const { sequelize } = require("../models");

class OrderCustomerService {
  orderCustomerRepository = new OrderCustomerRepository();
  itemOrderCustomerRepository = new ItemOrderCustomerRepository();
  itemRepository = new ItemRepository();

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
    // 주문 정보 가져오기
    const orderCustomer =
      await this.orderCustomerRepository.getOrderCustomerById(id);
    console.log(orderCustomer);

    // 이미 주문이 완료된 경우 에러 발생
    if (orderCustomer.state === true) {
      throw new Error("이미완료처리된 주문입니다");
    }

    // 트랜잭션 시작
    const t = await sequelize.transaction();

    try {
      // order_customer의 상태를 true로 업데이트
      await this.orderCustomerRepository.updateOrderCustomerState(id, t);

      // 주문 고객과 관련된 주문 상품들을 가져옴
      const orderItems =
        await this.itemOrderCustomerRepository.getItemsByOrderCustomerId(id);

      // 상품 수량 업데이트 및 트랜잭션 커밋
      for (const orderItem of orderItems) {
        const { itemId, amount } = orderItem;

        await this.itemRepository.updateItemAmount(itemId, -amount, t);
      }

      // 트랜잭션 커밋
      await t.commit();

      return "주문완료처리되었습니다";
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
