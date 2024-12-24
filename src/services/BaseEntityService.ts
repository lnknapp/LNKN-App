import { ODataResponse } from "../data/entities";
import { IDataRepository } from "../data/repo/IDataRepository";
import IODataRepository from "../data/repo/IODataRepository";
import { IService } from "./";

/**
 * Abstract class representing a base entity service.
 * @template TEntity - The entity type.
 * @template TRepo - The repository type that implements IDataRepository<TEntity>.
 */
export abstract class BaseEntityService<TEntity,
                                        TRepo extends IDataRepository<TEntity>,
                                        TODataRepo extends IODataRepository<TEntity>> implements IService<TEntity>{
  protected repo: TRepo;
  protected oDataRepo: TODataRepo;

  /**
   * Creates an instance of BaseEntityService.
   * @param {TRepo} repo - The repository instance.
   */
  constructor(repo: TRepo, oDataRepo: TODataRepo) {
    this.repo = repo;
    this.oDataRepo = oDataRepo;
  }

  async getAll(): Promise<TEntity[]> {
    return await this.repo.getAll();
  }

  async get(id: number): Promise<TEntity | null> {
    return await this.repo.get(id);
  }

  async insert(item: TEntity): Promise<TEntity> {
    return await this.repo.insert(item);
  }

  async update(id: number, item: TEntity): Promise<TEntity> {
    return await this.repo.update(id, item);
  }

  async delete(id: number): Promise<boolean> {
    return await this.repo.delete(id);
  }

  async query(query: string): Promise<ODataResponse<TEntity>> {
    return await this.oDataRepo.query(query);
  }
}
