import { Link } from "../../entities/pages";
import BaseDataRepository from "../BaseDataRepository";

export class LinkRepo extends BaseDataRepository<Link> {
  protected baseUrl = "link";

  async getByPageId(pageId: number): Promise<Link[]> {
    const response = await this.client.get(`${this.baseUrl}/page/${pageId}`);
    return this.handleResponse<Link[]>(response)!;
  }
}

export default LinkRepo;
