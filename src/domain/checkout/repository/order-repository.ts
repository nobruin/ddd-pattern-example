import RespositoryInterface from "../../@shared/repository/repository-interface"
import Order from "../entity/order";

export default interface OrderRepositoryInterface
    extends RespositoryInterface<Order> { }