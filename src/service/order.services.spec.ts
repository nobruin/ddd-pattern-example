import Customer from "../entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/order_item"
import OrderService from "./order.service"

describe("Order service unit", () => {
    it("should get total of all orders", () => {
        const item1 = new OrderItem("i1", "item 1", "10", 5, 2)
        const item2 = new OrderItem("i1", "item 2", "11", 10, 2)

        const order1 = new Order("o1", "c1", [item1])
        const order2 = new Order("o2", "c2", [item2])

        const total = OrderService.total([order1, order2])
        
        expect(total).toBe(30)
    })

    it("should place on order", () => {
        const customer = new Customer("c1", "Customer1")      
        const item1 = new OrderItem("i1", "p1", "item 1", 90, 1) 

        const order = OrderService.placeOrder(customer, [item1])
        expect(customer.rewardPoints).toBe(90/2)
        expect(order.total).toBe(90)
    })
})