import { RegionModel } from "../../entities";
import BaseODataRepository from "../BaseODataRepository";

export class RegionODataRepo extends BaseODataRepository<RegionModel> {
  protected baseUrl = "odata/regions";
}
