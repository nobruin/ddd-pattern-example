import Product from "./product"

describe("Product unit tests", ()=> {

    it("Should throw error when id is empty", () => {
        expect(() => {
            const product = new Product("", "Product1", 100)
        }).toThrowError("Id is required")
    })

    it("Should throw error when name is empty", () => {
        expect(() => {
            const product = new Product("1", "", 100)
        }).toThrowError("Name is required")
    })    

    it("Should throw error when price is empty", () => {
        expect(() => {
            const product = new Product("1", "Product1", -1)
        }).toThrowError("Price must be greater than zero")
    })

    it("Should change name", () => {
        const name = "Name"
        let product = new Product("1", name, 10)

        expect(product.name).toBe(name)
        const changedNamed = `Changed ${name}`
        product.changeName(changedNamed)

        expect(product.name).toBe(changedNamed)
    })

    it("Should change price", () => {
        const price = 10
        let product = new Product("1", "name", price)        
        expect(product.price).toBe(price)
        
        const changedPrice = 10 + price

        product.changePrice(changedPrice)
        expect(product.price).toBe(changedPrice)
    })

})

