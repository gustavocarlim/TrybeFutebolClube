export default interface IService<T> {
  getAll():Promise<T[]>;
  getById(id: number):Promise<T>;
}
