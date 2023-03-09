import Address from "./entity/address"
import Customer from "./entity/customer"
import Order from "./entity/order"
import OrderItem from "./entity/order_item"


let customer =  new Customer("123", "Bruno marins")
const address = new Address("Rua x", 32, "2000000", "Terra!")
customer.changeAddress(address)
customer.activate()

const item1 = new OrderItem("1", "item1", 10)
const item2 = new OrderItem("1", "item2", 9)
const item3 = new OrderItem("1", "item3", 15)

const order = new Order("1", "123", [item1, item2, item3])
