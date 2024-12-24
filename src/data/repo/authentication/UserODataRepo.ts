import { UserModel } from "../../entities";
import BaseODataRepository from "../BaseODataRepository";

export class UserODataRepo extends BaseODataRepository<UserModel> {
  protected baseUrl = `/OData/Users`;
}
