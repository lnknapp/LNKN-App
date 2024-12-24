import { AddressModel } from "../../data/entities";
import { AddressRepo } from "../../data/repo";
import { AddressODataRepo } from "../../data/repo/references/AddressODataRepo";
import { BaseEntityService } from "../BaseEntityService";

export class AddressService extends BaseEntityService<AddressModel, AddressRepo, AddressODataRepo> {
  constructor(){
    super(new AddressRepo(), new AddressODataRepo());
  }
}

export default AddressService;
