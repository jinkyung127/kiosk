const { ItemOrderCustomers } = require("../models");

class ItemOrderCustomerRepository {
  createItemOrderCustomer = async (itemOrderCustomerData) => {
    const createdItemOrderCustomerData = await ItemOrderCustomers.create(
      itemOrderCustomerData
    );

    return createdItemOrderCustomerData;
  };

  getItemsByOrderCustomerId = async (id) => {
    const orderItems = await ItemOrderCustomers.findAll({
      where: { orderCustomerId: id },
    });
    return orderItems;
  };

  deleteItemOrderCustomersByOrderCustomerId = async (
    orderCustomerId,
    transaction
  ) => {
    await ItemOrderCustomers.destroy({
      where: { orderCustomerId },
      transaction,
    });
  };
}

module.exports = ItemOrderCustomerRepository;
