import EventInterface from "./event.inface";

export default interface EventHandlerInterface<T extends EventInterface=EventInterface> {
    handle(event: T):void
}