import Order from "../../domain/entity/order"
import OrderRepositoryInterface from "../../domain/repository/order-repository"
import OrderItemModel from "../db/sequelize/model/order-item.model"
import OrderModel from "../db/sequelize/model/order.model"

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
    throw Error("method not implemented")
  }

  async findAll(): Promise<Order[]> {
    throw Error("method not implemented")
  }
}