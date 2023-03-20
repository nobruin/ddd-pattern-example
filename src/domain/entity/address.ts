export default class Address
{
    _street: string
    _number: number = 0
    _city: string
    _zip: string = ""
    constructor(street: string, number: number, zip: string, city: string) {
        this._street = street
        this._city = city
        this._number = number
        this._zip = zip
        this.validate()
    }

    validate(){
        if(this._street.length === 0){
            throw new Error("Street is required")
        }
        if(this._city.length === 0){
            throw new Error("City is required")
        }
        if(this._zip.length === 0){
            throw new Error("Zip is required")
        }
    }

  toString() {
    return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
  }

  get city() {return this._city}
  get number() {return this._number}
  get street() {return this._street}
  get zip() {return this._zip}
}
