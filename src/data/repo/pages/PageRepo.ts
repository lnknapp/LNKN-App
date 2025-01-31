import { Page } from "../../entities/pages";
import BaseDataRepository from "../BaseDataRepository";

export class PageRepo extends BaseDataRepository<Page> {
  protected baseUrl = "page";

  async getByUsernameAndSlug(userName: string, slug?: string): Promise<Page> {
    const response = await this.client.get(`${this.baseUrl}/${userName}/${slug}`);
    return this.handleResponse<Page>(response)!;
  }
}

export default PageRepo;
