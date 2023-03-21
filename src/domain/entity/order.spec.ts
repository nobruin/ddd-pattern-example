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

    it("Should add items total", () => {
        const item1 = new OrderItem("1", "122", "i1", 10,2)
        const item2 = new OrderItem("2", "122", "i2", 15,3)
        let order = new Order("234","232",[item1, item2])

        expect(order.total).toBe((item1.total + item2.total))

        const item3 = new OrderItem("3", "122", "i3", 15,3)
        order.addItems([item3])
        expect(order.total).toBe((item1.total + item2.total + item3.total))
    })

    it("Should throw Error adding items", () => {
        expect(() => {
            const item = new OrderItem("i1","p1","Item 1", 100 , 1);
            let order = new Order("o1", "c1", [item]);

            const item2 = new OrderItem("i2","p2","Item 2", 100 , 0);
            order.addItems([item2])
            
        }).toThrowError("Items quantity must be greater than 0");
    })

    it("should throw error if the item qte is less or equal zero 0", () => {
        expect(() => {
          const item = new OrderItem("i1","p1","Item 1", 100 , 0);
          const order = new Order("o1", "c1", [item]);
        }).toThrowError("Items quantity must be greater than 0");
    });


})

