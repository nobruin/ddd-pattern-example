import EventInterface from "../@shared/event.inface";

export default class AddressChangedEvent implements EventInterface{
    dateTimeOccured: Date
    eventData: any

    constructor(eventData: any) {
        this.dateTimeOccured = new Date()
        this.eventData = eventData
    }
}