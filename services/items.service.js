const ItemRepository = require("../repositories/items.repository");

class ItemService {
  itemRepository = new ItemRepository();

  createItem = async (name, price, type, optionId) => {
    const createItemData = await this.itemRepository.createItem(
      name,
      price,
      type,
      optionId
    );
    if (!name) {
      throw new Error("상품 이름을 입력하세요");
    } else if (!price) {
      throw new Error("상품 가격을 입력하세요");
    } else if (!type) {
      throw new Error("상품 타입을 입력하세요");
    } else {
      return createItemData;
    }
  };

  findAllItem = async () => {
    const allItem = await this.itemRepository.findAllItem();

    allItem.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return allItem;
  };

  findItemsByType = async (type) => {
    const items = await this.itemRepository.findAllByType(type);
    return items;
  };

  deleteItem = async (id) => {
    await this.itemRepository.deleteItem(id);
    return true;
  };

  updateItem = async (id, name, price, type, optionId) => {
    await this.itemRepository.updateItem(id, name, price, type, optionId);
    const updatedItem = await this.itemRepository.findItemById(id);

    return updatedItem;
  };

  updateItemAmount = async (itemId, amount) => {
    await itemRepository.updateItemAmount(itemId, amount);
  };
}

module.exports = ItemService;
