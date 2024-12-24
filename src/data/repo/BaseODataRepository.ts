import HttpClient from "../../api/HttpClient";
import { ODataResponse } from "../entities/odata";
import BaseRepository from "./BaseRepository";
import IODataRepository from "./IODataRepository";

export abstract class BaseODataRepository<TEntity> extends BaseRepository implements IODataRepository<TEntity> {
  protected client = new HttpClient();
  protected abstract baseUrl: string;

  /**
   * Retrieves data from the OData endpoint based on the provided OData query.
   * @param {string} [oDataQuery=""] - The OData query string.
   * @returns {Promise<ODataResponse<TEntity>>} - The OData response containing the data.
   */
  async query(oDataQuery: string): Promise<ODataResponse<TEntity>> {
    const url = `${this.baseUrl}/?$count=true&${oDataQuery}`;
    const response = await this.client.get(url);
    return this.handleResponse<ODataResponse<TEntity>>(response)!;
  }
}

export default BaseODataRepository;
