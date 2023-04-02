import SendEmailWhenProductIsCreateHandler from "../product/handler/send-email-when-product-is-created.handler"
import ProductCreatedEvent from "../product/product-created.event"
import EventDispacher from "./event-dispacher"

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

})