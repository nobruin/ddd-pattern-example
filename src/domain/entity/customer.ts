/* 
In the dd pattern, methods need to be written in expressive semantics.
To build the business language. That is: a script where the names show the intent of the system in each method written.
All entities need a validation power, that is, every time an entity is created, it needs to validate each of the required attributes.
*/

import Address from "./address"

export default class Customer {
    private _id: string
    private _name: string
    private _address!: Address
    private _active: boolean = true
    private _rewardPoints:number = 0

    constructor(id: string, name: string){
        this._id = id
        this._name = name
        this.validate()
    }

    get id(): string { return this._id}

    validate(){
        if(this._name.length === 0){
            throw new Error("Name is required")
        }
        if(this._id.length === 0){
            throw new Error("Id is required")
        }
    } 

    changeName(name: string): void{
        this._name = name
    }

    changeAddress(address: Address): void{
        this._address = address
    }

    isActive(){
        return this._active
    }
    
    activate(){
        if(this._address === undefined){
            throw new Error("Address is mandatory to activate a customer")
        }
        this._active = true
    }

    desactivate(){
        this._active = false
    }    

    addRewardPoints(points: number){
        this._rewardPoints += points
    }

    get rewardPoints():number {return this._rewardPoints}

    get name(): string{ return this._name }
    get address(): Address {return this._address}
}