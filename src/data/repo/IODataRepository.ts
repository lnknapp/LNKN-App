import { ODataResponse } from "../entities/odata";

/**
 * Represents a generic repository interface for OData operations.
 * @template TEntity The entity type.
 */
export interface IODataRepository<TEntity> {

  /**
   * Retrieves data from the OData endpoint based on the provided OData query.
   */
  query(oDataQuery: string): Promise<ODataResponse<TEntity>>;

}

export default IODataRepository;
