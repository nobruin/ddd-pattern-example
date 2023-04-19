import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";



export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customerId: entity.customerId,
      total: entity.total,
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        qtd: item.qtd,
        total: item.total
      })),
    },
      {
        include: [{ model: OrderItemModel }],
      })
  }

  async update(entity: Order): Promise<void> {
    try {      
      let sequelize = OrderModel.sequelize;
      await sequelize.transaction(async (t) => {
        await OrderItemModel.destroy({
          where: {orderId: entity.id},
          transaction: t
        })

        const items = entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          qtd: item.qtd,
          orderId: entity.id,
          total: item.calculateTotal()          
        }))

        await OrderItemModel.bulkCreate(items, { transaction: t })
        await OrderModel.update(           
           {
             total: entity.total,             
           },
          { where: { id: entity.id }, transaction: t }
        )
      })
    } catch (error) {
      console.log(error)
      throw new Error("Update order failed");
    }
  }

  async find(id: string): Promise<Order> {
    let orderModel
    try {
      orderModel = await OrderModel.findOne({
        where: { id: id },
        include: ["items"],
        rejectOnEmpty: true
      })
    } catch (error) {
      throw new Error("Order not found")
    }
    const items = orderModel.items.map((itemModel) => 
      new OrderItem(
        itemModel.id, 
        itemModel.productId, 
        itemModel.name, 
        itemModel.price, 
        itemModel.qtd
      )
    )
    const order = new Order(orderModel.id, orderModel.customerId, items)
    return order
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({     
      include: ["items"],
    })
    const orders = orderModels.map((orderModel) => {
      let items = orderModel.items.map((item) => {
          return new OrderItem(item.id, item.productId, item.name, item.price, item.qtd)
      })
      return new Order(orderModel.id,orderModel.customerId ,items)
    })
    return orders
  }
}