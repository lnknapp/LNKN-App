import HttpClient from "../../api/HttpClient";
import BaseRepository from "./BaseRepository";
import { IDataRepository } from "./IDataRepository";

export abstract class BaseDataRepository<TEntity> extends BaseRepository implements IDataRepository<TEntity>{
  protected client = new HttpClient();
  protected abstract baseUrl: string;

  async getAll(): Promise<TEntity[]> {
    const response = await this.client.get(`${this.baseUrl}`);
    return this.handleResponse<TEntity[]>(response)!;
  }

  async get(id: number): Promise<TEntity | null> {
    if (!id) return null;
    const response = await this.client.get(`${this.baseUrl}/${id}`);
    return this.handleResponse<TEntity>(response);
  }

  async insert(item: TEntity): Promise<TEntity> {
    const response = await this.client.post(this.baseUrl, item);
    return this.handleResponse<TEntity>(response)!;
  }

  async update(id: number, item: TEntity): Promise<TEntity> {
    const response = await this.client.put(`${this.baseUrl}/${id}`, item);
    return this.handleResponse<TEntity>(response)!;
  }

  async delete(id: number): Promise<boolean> {
    const response = await this.client.delete(`${this.baseUrl}/${id}`);
    return this.handleResponse<boolean>(response)!;
  }

}

export default BaseDataRepository;
