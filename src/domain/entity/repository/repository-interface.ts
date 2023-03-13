export default interface RespositoryInterface<T> {    

    create(entity: T): Promise<void>
    update(entity: T): Promise<void>
    find(entity: T): Promise<T>
    findAll(): Promise<T[]>
    
}