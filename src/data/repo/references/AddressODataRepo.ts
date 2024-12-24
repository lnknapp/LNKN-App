import { AddressModel } from "../../entities";
import BaseODataRepository from "../BaseODataRepository";

export class AddressODataRepo extends BaseODataRepository<AddressModel> {
  protected baseUrl = "odata/addresses";
}
