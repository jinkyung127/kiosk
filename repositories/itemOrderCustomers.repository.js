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

  // deleteItemsByOrderCustomerId = async (orderCustomerId) => {
  //   await ItemOrderCustomers.destroy({
  //     where: { orderCustomerId },
  //   });
  // };
}

module.exports = ItemOrderCustomerRepository;
