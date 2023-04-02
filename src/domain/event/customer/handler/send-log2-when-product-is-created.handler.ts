import Customer from "../../../entity/customer";
import EventHandlerInterface from "../../@shared/event-handler.inteface";
import CustomerCreatedEvent from "../customer-created.event";


export default class SendLog2WhenCustomerIsCreated 
implements EventHandlerInterface<CustomerCreatedEvent>{
    handle(event: CustomerCreatedEvent): void{
        const {id, name, address} = event.eventData.customer as Customer
        console.log(`Handler2:sendLog2WhenCustomerIsCreated:This is the second console.log for the event: CustomerCreated`)
        console.log(`****************`)
        console.log(`Address of Client: ${id}, ${name} update to ${address}`)
        console.log(`****************`)
    }
}