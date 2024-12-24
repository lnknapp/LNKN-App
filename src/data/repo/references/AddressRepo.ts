import { AddressModel } from "../../entities";
import BaseDataRepository from "../BaseDataRepository";

export class AddressRepo extends BaseDataRepository<AddressModel> {
  protected baseUrl = "address";
}

export default AddressRepo;
