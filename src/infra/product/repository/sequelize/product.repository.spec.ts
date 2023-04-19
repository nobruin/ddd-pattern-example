import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model"
import ProductRepository from "./product.repository"
import Product from "../../../../domain/product/entity/product"


describe("Product repository test", () => {
  let sequileze: Sequelize

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    })
    sequileze.addModels([ProductModel])
    await sequileze.sync()
  })

  afterEach(async () => {
    await sequileze.close()
  })

  it("should create a product", async () => {
    const productRepository = new ProductRepository()
    const product = new Product("1", "p1", 100)

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: product.id } })

    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    })
  })


  it("should update a product", async () => {
    const productRepository = new ProductRepository()
    let product = new Product("1", "p1", 100)

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: product.id } })

    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    })

    product.changeName("p2")
    product.changePrice(90)

    await productRepository.update(product)
    
    const productModelUpdated = await ProductModel.findOne({ where: { id: product.id } })

    expect(productModelUpdated.toJSON()).toStrictEqual({
        id: product.id,
        name: product.name,
        price: product.price,
      })    
  })

  it("should find all", async () => {
    const productRepository = new ProductRepository()
    const product1 = new Product("1", "p1", 100)
    await productRepository.create(product1)

    const product2 = new Product("2", "p2", 10)
    await productRepository.create(product2)

    const foundProducts = await productRepository.findAll()
    expect(foundProducts).toEqual([product1, product2])
  })

})
