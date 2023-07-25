"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // enum으로 응용 가능한 상태값 정의
    const orderItemState = {
      ORDERED: "ORDERED",
      PENDING: "PENDING",
      COMPLETED: "COMPLETED",
      CANCELED: "CANCELED",
    };

    await queryInterface.createTable("OrderItems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      itemId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Items",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      state: {
        allowNull: false,
        type: Sequelize.ENUM(
          ...Object.values(orderItemState) // ENUM의 가능한 값들을 전개 연산자를 사용하여 전달
        ),
        defaultValue: orderItemState.ORDERED, // 기본값 설정 (여기서는 ORDERED)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("OrderItems");
  },
};
