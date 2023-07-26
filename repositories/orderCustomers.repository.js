const { OrderCustomers } = require("../models");

class OrderCustomerRepository {
  createOrderCustomer = async (state) => {
    const createOrderCustomerData = await OrderCustomers.create({
      state,
    });

    return createOrderCustomerData;
  };

  getOrderCustomerById = async (id) => {
    const orderCustomer = await OrderCustomers.findOne({ where: { id } });
    if (!orderCustomer) {
      throw new Error("해당하는 주문이 없습니다.");
    }
    return orderCustomer;
  };

  updateOrderCustomerState = async (id, transaction) => {
    await OrderCustomers.update(
      { state: true },
      { where: { id }, transaction }
    );
  };

  // deleteOrderCustomer = async (orderId) => {
  //   await OrderCustomers.destroy({ where: { id: orderId } });
  // };
}

module.exports = OrderCustomerRepository;
