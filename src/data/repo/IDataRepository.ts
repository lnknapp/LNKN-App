/**
 * Represents a generic repository interface for CRUD operations.
 * @template TEntity The entity type.
 */
export interface IDataRepository<TEntity> {

  /**
   * Retrieves all entities.
   * @returns A promise that resolves to an array of entities.
   */
  getAll(): Promise<TEntity[]>;

  /**
   * Retrieves an entity by its ID.
   * @param id The ID of the entity.
   * @returns A promise that resolves to the entity if found, or null if not found.
   */
  get(id: number): Promise<TEntity | null>;

  /**
   * Inserts a new entity.
   * @param item The entity to insert.
   * @returns A promise that resolves to the inserted entity.
   */
  insert(item: TEntity): Promise<TEntity>;

  /**
   * Updates an existing entity.
   * @param id The ID of the entity to update.
   * @param item The updated entity.
   * @returns A promise that resolves to the updated entity.
   */
  update(id: number, item: TEntity): Promise<TEntity>;

  /**
   * Deletes an entity by its ID.
   * @param id The ID of the entity to delete.
   * @returns A promise that resolves to true if the entity was deleted successfully, or false otherwise.
   */
  delete(id: number): Promise<boolean>;
  
}

export default IDataRepository;
