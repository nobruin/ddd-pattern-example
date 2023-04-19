import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";
import ProductModel from "../../../product/repository/sequelize/product.model";

@Table({
    tableName: "order_items",
    timestamps: false,
})
export default class OrderItemModel extends Model{
    @PrimaryKey
    @Column
    declare id: string

    @ForeignKey(() => ProductModel)
    @Column({field: "product_id",allowNull: false})
    declare productId: string

    @BelongsTo(() => ProductModel)
    declare product: ProductModel

    @ForeignKey(() => OrderModel)
    @Column({field: "order_id",allowNull: false})
    declare orderId: string

    @BelongsTo(() => OrderModel)
    declare order: OrderModel

    @Column({allowNull: false})
    declare total: number

    @Column({allowNull: false})
    declare qtd: number

    @Column({allowNull: false})
    declare name: string

    @Column({allowNull: false})
    declare price: number    
}