"use strict";
const { Model } = require("sequelize");

const orderItemState = {
  ORDERED: 0,
  PENDING: 1,
  COMPLETED: 2,
  CANCELED: 3,
};

module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Items, {
        targetKey: "id",
        foreignKey: "itemId",
      });
    }
  }
  OrderItems.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      itemId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      state: {
        allowNull: false,
        type: DataTypes.ENUM(Object.values(orderItemState)),
        defaultValue: orderItemState.ORDERED,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "OrderItems",
    }
  );
  return OrderItems;
};
