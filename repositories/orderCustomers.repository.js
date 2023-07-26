const { OrderCustomers } = require("../models");

class OrderCustomerRepository {
  createOrderCustomer = async (state) => {
    const createOrderCustomerData = await OrderCustomers.create({
      state,
    });

    return createOrderCustomerData;
  };

  getOrderCustomerById = async (orderId) => {
    const orderCustomer = await OrderCustomers.findByPk(orderId);
    if (!orderCustomer) {
      throw new Error("해당하는 주문이 없습니다.");
    }
    return orderCustomer;
  };

  // 주문 사용자의 상태(state)를 업데이트하는 메서드
  updateOrderCustomerState = async (id) => {
    const updateOrderCustomerState = await OrderCustomers.update(
      { state: true },
      { where: { id } }
    );

    return updateOrderCustomerState;
  };

  // 주문 사용자와 관련된 데이터를 삭제하는 메서드
  deleteOrderCustomer = async (orderId, options) => {
    await OrderCustomers.destroy({ where: { id: orderId } });
  };
}

module.exports = OrderCustomerRepository;
