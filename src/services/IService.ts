/**
 * Represents a generic service interface for CRUD operations on entities.
 * @template TEntity The entity type.
 */
export interface IService<TEntity> {
  /**
   * Retrieves all entities.
   * @returns {Promise<TEntity[]>} - A promise that resolves to an array of entities.
   */
  getAll(): Promise<TEntity[]>;

  /**
   * Retrieves an entity by its ID.
   * @param {number} id - The ID of the entity.
   * @returns {Promise<TEntity | null>} - A promise that resolves to the entity or null if not found.
   */
  get(id: number): Promise<TEntity | null>;

  /**
   * Inserts a new entity.
   * @param {TEntity} item - The entity to insert.
   * @returns {Promise<TEntity>} - A promise that resolves to the inserted entity.
   */
  insert(item: TEntity): Promise<TEntity>;

  /**
   * Updates an entity by its ID.
   * @param {number} id - The ID of the entity to update.
   * @param {TEntity} item - The updated entity.
   * @returns {Promise<TEntity>} - A promise that resolves to the updated entity.
   */
  update(id: number, item: TEntity): Promise<TEntity>;

  /**
   * Deletes an entity by its ID.
   * @param {number} id - The ID of the entity to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the entity was deleted successfully, false otherwise.
   */
  delete(id: number): Promise<boolean>;
}
