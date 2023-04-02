import EventHandlerInterface from "../../@shared/event-handler.inteface";
import CustomerCreatedEvent from "../customer-created.event";


export default class SendLog1WhenCustomerIsCreated 
implements EventHandlerInterface<CustomerCreatedEvent>{
    handle(event: CustomerCreatedEvent): void{
        console.log(`This is the first console.log for the event: CustomerCreated`)
    }
}