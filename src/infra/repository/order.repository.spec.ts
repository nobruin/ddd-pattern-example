import { Sequelize } from "sequelize-typescript"
import Address from "../../domain/entity/address"
import Customer from "../../domain/entity/customer"
import Order from "../../domain/entity/order"
import OrderItem from "../../domain/entity/order_item"
import Product from "../../domain/entity/product"
import CustomerModel from "../db/sequelize/model/customer.mode"
import OrderItemModel from "../db/sequelize/model/order-item.model"
import OrderModel from "../db/sequelize/model/order.model"
import ProductModel from "../db/sequelize/model/product.model"
import CustomerRepository from "./customer.repository"
import OrderRepository from "./order.repository"
import ProductRepository from "./product.repository"

describe("Order repository test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    })

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer("123", "Customer 1")
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product("123", "Product 1", 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,      
      2
    )

    const order = new Order("123", "123", [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customerId: "123",
      total: order.total,
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          qtd: orderItem.qtd,
          orderId: "123",
          productId: "123",
          total: orderItem.total
        },
      ],
    })
  })
})