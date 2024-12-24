import BaseODataRepository from "../BaseODataRepository";
import RoleModel from "../../entities/user/RoleModel";

export class RoleODataRepo extends BaseODataRepository<RoleModel> {
  protected baseUrl = `/OData/roles`;
}
