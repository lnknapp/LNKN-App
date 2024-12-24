import { BaseEntityService } from "../BaseEntityService"
import { RoleODataRepo, RoleRepo } from "../../data/repo";
import RoleModel from "../../data/entities/user/RoleModel";


export class RoleService extends BaseEntityService<RoleModel, RoleRepo, RoleODataRepo> {
  constructor(){
    super(new RoleRepo(), new RoleODataRepo());
  }
}

export default RoleService;
