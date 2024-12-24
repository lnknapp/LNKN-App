import BaseDataRepository from "../BaseDataRepository";
import RoleModel from "../../entities/user/RoleModel";
export class RoleRepo extends BaseDataRepository<RoleModel> {
  protected baseUrl = 'role';
}

export default RoleRepo;
