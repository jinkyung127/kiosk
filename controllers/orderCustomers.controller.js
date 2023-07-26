const OrderCustomerService = require("../services/orderCustomers.service");

class OrderCustomersController {
  orderCustomerService = new OrderCustomerService();

  createOrderCustomer = async (req, res, next) => {
    const { customerId, orderItems } = req.body;
    try {
      const totalAmount = await this.orderCustomerService.createOrderCustomer(
        customerId,
        orderItems
      );
      res.status(201).json({ totalAmount });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };

  // 주문 완료 API
  completeOrder = async (req, res, next) => {
    const { id } = req.params;
    try {
      // 주문 완료 작업을 수행하는 서비스 메서드 호출
      const totalAmount = await this.orderCustomerService.completeOrder(id);

      res.status(200).json({ totalAmount });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  // 주문 취소 API
  // cancelOrder = async (req, res, next) => {
  //   const { orderCustomerId } = req.params;
  //   try {
  //     // 주문 취소 작업을 수행하는 서비스 메서드 호출
  //     await this.orderCustomerService.cancelOrder(orderCustomerId);

  //     // 주문 취소가 성공적으로 이루어지면 성공 메시지를 응답으로 반환
  //     res.status(200).json({ message: "주문이 취소되었습니다." });
  //   } catch (error) {
  //     // 에러 발생 시 에러 메시지를 응답으로 반환
  //     res.status(400).json({ message: error.message });
  //   }
  // };
}

module.exports = OrderCustomersController;
