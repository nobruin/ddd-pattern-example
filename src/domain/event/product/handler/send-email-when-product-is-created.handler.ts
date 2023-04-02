import EventHandlerInterface from "../../@shared/event-handler.inteface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreateHandler 
implements EventHandlerInterface<ProductCreatedEvent>{
    handle(event: ProductCreatedEvent):void{
        console.log(`Sending email to ...`)
    }
}