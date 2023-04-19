import ProductFactory from "./product.factory"

describe("Product factory unit tests", () => {
    it("Should create a product type a", () =>{
        const product = ProductFactory.create("a", "P.A",1)
        expect(product.id).toBeDefined()
        expect(product.name).toBe("P.A")
        expect(product.price).toBe(1)
        expect(product.constructor.name).toBe("Product")
    })

    it("Should create a product type b", () =>{
        const product = ProductFactory.create("b", "P.A",1)
        expect(product.id).toBeDefined()
        expect(product.name).toBe("P.A")
        expect(product.price).toBe(2)
        expect(product.constructor.name).toBe("ProductB")
    })
})