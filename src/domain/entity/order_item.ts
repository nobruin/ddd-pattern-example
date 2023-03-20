export default class OrderItem {
    private _id: string
    private _name: string
    private _price: number
    private _qtd: number
    private _productId: string
    private _total: number

    constructor(id: string, productId: string, name: string, price: number, qtd: number) {
        this._id = id
        this._name = name
        this._price = price
        this._qtd = qtd
        this._productId = productId
        this._total = this.calculateTotal()
    }

    get price(): number { return this._price }

    get qtd(): number { return this._qtd }

    calculateTotal(): number {
        return this._price * this._qtd
    }

    get total(): number { return this._total }

    get id(): string { return this._id }

    get name(): string { return this._name }

    get productId(): string { return this._productId }

}