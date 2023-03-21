import Product from "../entity/product";
import RespositoryInterface from "./repository-interface"

export default interface ProductRepositoryInterface
    extends RespositoryInterface<Product> { }