import EventDispacherInterface from "./event-dispacher.interface";
import EventHandlerInterface from "./event-handler.inteface";
import EventInterface from "./event.inface";

export default class EventDispacher implements EventDispacherInterface{

    private eventHandlers: { [eventName: string]: EventHandlerInterface[]} = {}

    get getEventHandlers(): {[eventName: string]: EventHandlerInterface[]} {
        return this.eventHandlers   
    }

    notify(event: EventInterface): void{
        const eventName = event.constructor.name
        if(this.eventHandlers[eventName]){
            this.eventHandlers[eventName].forEach((eventHandler) => {
                eventHandler.handle(event)
            })
        }
    }
    register(eventName: string, eventHander: EventHandlerInterface): void{
        if(!this.eventHandlers[eventName]){
            this.eventHandlers[eventName] = []
        }

        this.eventHandlers[eventName].push(eventHander)
    }
    unregister(eventName: string, eventHander: EventHandlerInterface): void{
        if(this.eventHandlers[eventName]){            
            const index = this.eventHandlers[eventName].indexOf(eventHander)            
            if(index != -1){
                this.eventHandlers[eventName].splice(index, 1)
            }
        }
    }
    unregisterAll(): void{
        this.eventHandlers = {}    
    }
}