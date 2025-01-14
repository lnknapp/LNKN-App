import { Page } from "../../entities/pages";
import BaseDataRepository from "../BaseDataRepository";

export class PageRepo extends BaseDataRepository<Page> {
  protected baseUrl = "page";
}

export default PageRepo;
