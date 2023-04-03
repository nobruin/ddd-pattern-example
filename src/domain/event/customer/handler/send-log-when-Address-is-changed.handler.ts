import Customer from "../../../entity/customer";
import EventHandlerInterface from "../../@shared/event-handler.inteface";
import CustomerCreatedEvent from "../customer-created.event";


export default class SendLogWhenAddressIsChanged 
implements EventHandlerInterface<CustomerCreatedEvent>{
    handle(event: CustomerCreatedEvent): void{
        const {id, name, address} = event.eventData.customer as Customer
        console.log(`Handler2:sendLog2WhenAddressIsChanged:This is the console.log for the event: AddressChanged`)
        console.log(`****************`)
        console.log(`Address of Client: ${id}, ${name} update to ${address}`)
        console.log(`****************`)
    }
}