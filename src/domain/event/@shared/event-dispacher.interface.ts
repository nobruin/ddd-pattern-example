import EventHandlerInterface from "./event-handler.inteface";
import EventInterface from "./event.inface";

export default interface EventDispacherInterface{
    notify(event: EventInterface): void
    register(eventName: String, eventHander: EventHandlerInterface): void
    unregister(eventName: String, eventHander: EventHandlerInterface): void
    unregisterAll(): void
}