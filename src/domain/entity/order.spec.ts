import Order from "./order"
import OrderItem from "./order_item"

describe("Order unit tests", ()=> {

    it("Should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", [])
        }).toThrowError("Id is required")
    })

    it("Should throw error when ProductId is empty", () => {
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
        const item1 = new OrderItem("1", "123", "il1", 10,2)
        const item2 = new OrderItem("1", "122", "i1", 15,3)
        let order = new Order("234","232",[item1, item2])

        expect(order.total).toBe((item1.total + item2.total))
    })
    it("should throw error if the item qte is less or equal zero 0", () => {
        expect(() => {
          const item = new OrderItem("i1","p1","Item 1", 100 , 0);
          const order = new Order("o1", "c1", [item]);
        }).toThrowError("Quantity must be greater than 0");
    });
})

