import { Page } from "../../entities/pages";
import BaseODataRepository from "../BaseODataRepository";

export class PageODataRepo extends BaseODataRepository<Page> {
  protected baseUrl = "odata/pages";
}
