import Product from "../entity/product"
import ProductService from "./product.service"

describe("Product service unit", () => {
    it("should change the porices of all products", () => {
        const product1 = new Product("123", "Product1", 10)
        const product2 = new Product("124", "Product2", 10)
        const product3 = new Product("126", "Product3", 4)  
        const products = [product1, product2, product3]

        ProductService.increasePrice(products, 100)

        expect(product1.price).toBe(20)
        expect(product2.price).toBe(20)
        expect(product3.price).toBe(8)
    })
    
})