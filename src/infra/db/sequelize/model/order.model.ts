import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "./customer.mode";
import OrderItemModel from "./order-item.model";

@Table({
    tableName: "orders",
    timestamps: false,
})
export default class OrderModel extends Model{
    @PrimaryKey
    @Column
    declare id: string

    @ForeignKey(() => CustomerModel)
    @Column({field: "customer_id",allowNull: false})
    declare customerId: string

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel

    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[]

    @Column({allowNull: false})
    declare total: number
    
}