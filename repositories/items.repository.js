const { Items } = require("../models");

class ItemRepository {
  createItem = async (name, price, type) => {
    const createItemData = await Items.create({
      name,
      price,
      type,
    });

    return createItemData;
  };

  findAllItem = async () => {
    const allItems = await Items.findAll();

    return allItems;
  };

  findAllByType = async (type) => {
    const items = await Items.findAll({ where: { type: type } });
    return items;
  };

  findItemById = async (id) => {
    const item = await Items.findByPk(id);

    return item;
  };

  deleteItem = async (id) => {
    const deleteItemData = await Items.destroy({
      where: { id },
    });

    return deleteItemData;
  };

  updateItem = async (id, name, price, type) => {
    const updateItemData = await Items.update(
      { name, price, type },
      { where: { id: Number(id) } }
    );

    return updateItemData;
  };

  async updateItemAmount(itemId, amount) {
    await Items.update({ amount }, { where: { id: itemId } });
  }
}

module.exports = ItemRepository;
