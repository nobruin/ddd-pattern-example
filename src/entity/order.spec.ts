import Order from "./order"
import OrderItem from "./order_item"

describe("Order unit tests", ()=> {

    it("Should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", [])
        }).toThrowError("Id is required")
    })

    it("Should throw error when CustomerId is empty", () => {
        expect(() => {
            let order = new Order("123", "", [])
        }).toThrowError("CustomerId is required")
    })

    it("Should throw error when OrderItems is empty", () => {
        expect(() => {
            let order = new Order("123", "123", [])
        }).toThrowError("Items are required")
    })

    it("Should calculate total", () => {
        const item1 = new OrderItem("1", "i1", 10)
        const item2 = new OrderItem("1", "i1", 10)
        let order = new Order("123", "123", [item1])

        expect(order.total()).toBe(item1.price)

        let order1 = new Order("234","232",[item1, item2])

        expect(order1.total()).toBe((item1.price + item2.price))
    })
})

