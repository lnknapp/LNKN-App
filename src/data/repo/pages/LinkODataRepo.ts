import { Link } from "../../entities/pages";
import BaseODataRepository from "../BaseODataRepository";

export class LinkODataRepo extends BaseODataRepository<Link> {
  protected baseUrl = "odata/links";
}
