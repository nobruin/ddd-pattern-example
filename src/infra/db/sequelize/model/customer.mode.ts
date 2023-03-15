import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "customer",
    timestamps: false,
})
export default class CustomerModel extends Model{
    @PrimaryKey
    @Column
    declare id: string

    @Column({allowNull: false})
    declare name: string

    @Column({allowNull: false})
    declare price: number    
}