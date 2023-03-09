import Address from "./address"
import Customer from "./customer"
describe("Customer unit tests", ()=> {

    it("Should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John")
        }).toThrowError("Id is required")
    })
     
    it("Should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "")
        }).toThrowError("Name is required")
    })

    it("Should change name", () => {
        let customer = new Customer("123", "John")
        let nameChanged = "Silva"
            customer.changeName(nameChanged)
        expect(customer.name).toBe(nameChanged)
    })

    it("Should activate and change address", () => {
        let customer = new Customer("123", "John")
        let address = new Address("Street Blue", 21,"234232322", "New City")
        customer.changeAddress(address)
        customer.activate()
        expect(customer.address).toBe(address)
        expect(customer.isActive()).toBe(true)
    })

    it("Should throw error address is undefined when activate a customer", () => {
        
        expect( () => {
            const customer = new Customer("123", "John")
            customer.activate()
        }).toThrowError("Address is mandatory to activate a customer")
    })

    it("Should desactivate and change address", () => {
        let customer = new Customer("123", "John")
        
        customer.desactivate()

        expect(customer.isActive()).toBe(false)
    })
})