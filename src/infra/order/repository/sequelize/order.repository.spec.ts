import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../customer/repository/sequelize/customer.mode"

import OrderItemModel from "./order-item.model"
import ProductModel from "../../../product/repository/sequelize/product.model"
import Product from "../../../../domain/product/entity/product"
import Order from "../../../../domain/checkout/entity/order"
import OrderRepository from "./order.repository"
import OrderItem from "../../../../domain/checkout/entity/order_item"
import Customer from "../../../../domain/customer/entity/customer"
import Address from "../../../../domain/customer/entity/value-objects/address"
import OrderModel from "./order.model"
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository"
import ProductRepository from "../../../product/repository/sequelize/product.repository"

describe("Order repository test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    })
    
    sequelize.addModels([
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

  it("should throw an error when order update is not found", async () => {
    const orderRepository = new OrderRepository()
    const item = new OrderItem("1", "1", "i1", 10, 1)
    const order = new Order("1", "1", [item])
    
    expect(async () => {      
      await orderRepository.update(order)
    }).rejects.toThrow("Update order failed")
  })

  it("should find a order", async () => {
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

    const orderResult = await orderRepository.find(order.id)

    expect(order).toStrictEqual(orderResult)
  })


  it("should update a order", async () => {
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

    const customer2 = new Customer("12", "Customer 2")
    const orderItem2 = new OrderItem(
      "2",
      product.id,
      product.name,
      product.price,      
      3
    )
    order.addItems([orderItem2])

    await orderRepository.update(order)

    const orderModel2 = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    })
    
    expect(orderModel2.toJSON()).toStrictEqual({
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
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          qtd: orderItem2.qtd,
          orderId: "123",
          productId: "123",
          total: orderItem2.total
        },
      ],
    })
  })

  it("should find all", async () => {

    const customerRepository = new CustomerRepository()
    const customer = new Customer("123", "Customer 1")
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product("123", "Product 1", 10)
    await productRepository.create(product)

    const orderItem1 = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,      
      2
    )
    const orderItem2 = new OrderItem(
      "2",
      product.id,
      product.name,
      product.price,      
      3
    )
    const order1 = new Order("123", "123", [orderItem1])
    const orderRepository = new OrderRepository()
    await orderRepository.create(order1)
    
    const order2 = new Order("1234", "123", [orderItem2])
    await orderRepository.create(order2)
    const foundOrders = await orderRepository.findAll()
      
    expect(foundOrders).toEqual([order1, order2])
  })
})