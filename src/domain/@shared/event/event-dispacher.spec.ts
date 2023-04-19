import SendLogWhenAddressIsChanged from "../../customer/event/handler/send-log-when-Address-is-changed.handler"
import SendLog1WhenCustomerIsCreated from "../../customer/event/handler/send-log1-when-customer-is-created.handler"
import SendLog2WhenCustomerIsCreated from "../../customer/event/handler/send-log2-when-customer-is-created.handler"
import SendEmailWhenProductIsCreateHandler from "../../product/event/handler/send-email-when-product-is-created.handler"
import ProductCreatedEvent from "../../product/event/product-created.event"
import EventDispacher from "./event-dispacher"
import Customer from "../../customer/entity/customer"
import Address from "../../customer/entity/value-objects/address"
import CustomerCreatedEvent from "../../customer/event/customer-created.event"
import AddressChangedEvent from "../../customer/event/address-changed.event"



describe("Domain events tests", () => {
    it("should register an event handler ", () =>{

        const eventName = "ProductCreatedEvent"
        const eventDispacher = new EventDispacher()
        const eventHander = new SendEmailWhenProductIsCreateHandler()

        eventDispacher.register(eventName, eventHander)

        expect(eventDispacher.getEventHandlers[eventName]).toBeDefined()
        expect(eventDispacher.getEventHandlers[eventName].length).toBe(1)
        expect(eventDispacher.getEventHandlers[eventName][0])
        .toMatchObject(eventHander) 
    })

    it("should unregister an event handler ", () =>{
        const eventName = "ProductCreatedEvent"
        const eventDispacher = new EventDispacher()
        const eventHander = new SendEmailWhenProductIsCreateHandler()

        eventDispacher.register(eventName, eventHander)

        expect(eventDispacher.getEventHandlers[eventName]).toBeDefined()
       
        eventDispacher.unregister(eventName, eventHander)
        expect(eventDispacher.getEventHandlers[eventName]).toBeDefined()
        expect(eventDispacher.getEventHandlers[eventName].length).toBe(0)
    })

    it("should unregister all an event handlers ", () =>{
        const eventName = "ProductCreatedEvent"
        const eventDispacher = new EventDispacher()
        const eventHander = new SendEmailWhenProductIsCreateHandler()

        eventDispacher.register(eventName, eventHander)

        expect(eventDispacher.getEventHandlers[eventName]).toBeDefined()
       
        eventDispacher.unregisterAll()
        expect(eventDispacher.getEventHandlers[eventName]).toBeUndefined()
    })

    it("should nofify all an event handlers ", () =>{
        const eventName = "ProductCreatedEvent"
        const eventDispacher = new EventDispacher()
        const eventHander = new SendEmailWhenProductIsCreateHandler()
        const spyEventHandler = jest.spyOn(eventHander, "handle")

        eventDispacher.register(eventName, eventHander)

        expect(eventDispacher.getEventHandlers[eventName]).toBeDefined()

        const productCreatedEvent = new ProductCreatedEvent(
            {
                name:"P1",
                description: "P1 description",
                price: 10    
            })

        eventDispacher.notify(productCreatedEvent)
        expect(spyEventHandler).toHaveBeenCalled()          
    })    

    it("should register a customer event handler ", () =>{

        const eventCustomerName1 = "CustomerCreatedEvent1"
        const eventCustomerName2 = "CustomerCreatedEvent2"
        const eventDispacher = new EventDispacher()
        const eventCustomerHander1 = new SendLog1WhenCustomerIsCreated()
        const eventCustomerHander2 = new SendLog2WhenCustomerIsCreated()

        eventDispacher.register(eventCustomerName1, eventCustomerHander1)
        eventDispacher.register(eventCustomerName2, eventCustomerHander2)

        expect(eventDispacher.getEventHandlers[eventCustomerName1]).toBeDefined()
        expect(eventDispacher.getEventHandlers[eventCustomerName1].length).toBe(1)
        expect(eventDispacher.getEventHandlers[eventCustomerName1][0])
        .toMatchObject(eventCustomerHander1) 

        expect(eventDispacher.getEventHandlers[eventCustomerName2]).toBeDefined()
        expect(eventDispacher.getEventHandlers[eventCustomerName2].length).toBe(1)
        expect(eventDispacher.getEventHandlers[eventCustomerName2][0])
        .toMatchObject(eventCustomerHander2) 
    })

    it("should unregister a customer event handler ", () =>{
        const eventCustomerName1 = "CustomerCreatedEvent1"
        const eventCustomerName2 = "CustomerCreatedEvent2"
        const eventDispacher = new EventDispacher()
        const eventCustomerHander1 = new SendLog1WhenCustomerIsCreated()
        const eventCustomerHander2 = new SendLog2WhenCustomerIsCreated()

        eventDispacher.register(eventCustomerName1, eventCustomerHander1)
        eventDispacher.register(eventCustomerName2, eventCustomerHander2)

        expect(eventDispacher.getEventHandlers[eventCustomerName1]).toBeDefined()
  
        expect(eventDispacher.getEventHandlers[eventCustomerName2]).toBeDefined()
       
        eventDispacher.unregister(eventCustomerName1, eventCustomerHander1)
        eventDispacher.unregister(eventCustomerName2, eventCustomerHander2)

        expect(eventDispacher.getEventHandlers[eventCustomerName1]).toBeDefined()
        expect(eventDispacher.getEventHandlers[eventCustomerName1].length).toBe(0)

        expect(eventDispacher.getEventHandlers[eventCustomerName2]).toBeDefined()
        expect(eventDispacher.getEventHandlers[eventCustomerName2].length).toBe(0)
    })

    it("should unregister all an event handlers ", () =>{
        const eventCustomerName1 = "CustomerCreatedEvent1"
        const eventCustomerName2 = "CustomerCreatedEvent2"
        const eventDispacher = new EventDispacher()
        const eventCustomerHander1 = new SendLog1WhenCustomerIsCreated()
        const eventCustomerHander2 = new SendLog2WhenCustomerIsCreated()

        eventDispacher.register(eventCustomerName1, eventCustomerHander1)
        eventDispacher.register(eventCustomerName2, eventCustomerHander2)


        expect(eventDispacher.getEventHandlers[eventCustomerName1]).toBeDefined()
        expect(eventDispacher.getEventHandlers[eventCustomerName2]).toBeDefined()
       
        eventDispacher.unregisterAll()
        expect(eventDispacher.getEventHandlers[eventCustomerName1]).toBeUndefined()
        expect(eventDispacher.getEventHandlers[eventCustomerName2]).toBeUndefined()
    })


    it("should nofify all a customer created event handlers", () =>{
        const eventName = "CustomerCreatedEvent"        
        const eventDispacher = new EventDispacher()        
        const eventHander1 = new SendLog1WhenCustomerIsCreated()
        const eventHander2 = new SendLog2WhenCustomerIsCreated()
        const spyEventHandler1 = jest.spyOn(eventHander1, "handle")
        const spyEventHandler2 = jest.spyOn(eventHander2, "handle")

        eventDispacher.register(eventName, eventHander1)
        eventDispacher.register(eventName, eventHander2)

        expect(eventDispacher.getEventHandlers[eventName]).toBeDefined()        

        let customer = new Customer("c1", "Customer da Silva")

        const customerCreatedEvent = new CustomerCreatedEvent({customer: customer})

        eventDispacher.notify(customerCreatedEvent)                
        expect(spyEventHandler1).toHaveBeenCalled()
        expect(spyEventHandler2).toHaveBeenCalled()
    })

    it("should nofify all an Address is Changed event handlers", () =>{
        const eventName = "AddressChangedEvent"        
        const eventDispacher = new EventDispacher()        
        const eventHander = new SendLogWhenAddressIsChanged()
        const spyEventHandler = jest.spyOn(eventHander, "handle")

        eventDispacher.register(eventName, eventHander)
        
        expect(eventDispacher.getEventHandlers[eventName]).toBeDefined()
        let customer = new Customer("c1", "Customer da Silva")
        let address = new Address("Street 1", 1, "89028198", "sorocaba")
        customer.changeAddress(address)

        const addressChangedEvent = new AddressChangedEvent({customer: customer})

        eventDispacher.notify(addressChangedEvent)
        expect(spyEventHandler).toHaveBeenCalled()
    })
})    