import { UserModel } from "../../entities";
import BaseDataRepository from "../BaseDataRepository";
export class UserRepo extends BaseDataRepository<UserModel> {
  protected baseUrl = 'User';
}

export default UserRepo;