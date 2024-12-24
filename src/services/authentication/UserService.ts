import { store, setUserInfo } from "../../app/store";
import { ODataResponse, UserModel } from "../../data/entities";
import { UserODataRepo, UserRepo } from "../../data/repo";
import { Role } from "../../models";
import { BaseEntityService } from "../../services/BaseEntityService";
import { forceLogout } from "../../utils";
import TokenService from "./TokenService";
export class UserService extends BaseEntityService<UserModel, UserRepo, UserODataRepo> {

  constructor(){
    super(new UserRepo(), new UserODataRepo());
  }

  static readonly getUserInfo = () => store.getState().authentication.userInfo;

  static readonly getUserToken = () => store.getState().authentication.userToken;

  static readonly getTokenData = () => store.getState().authentication.tokenData;


  static readonly getDisplayName = () => {
    let currentUser = this.getUserInfo();
    return !currentUser ? "" :
      `${currentUser?.firstName ?? currentUser.userName} ${currentUser.lastName ?? ""}`;
  }

  static readonly getId = () => this.getUserInfo()?.id ?? 0;

  static readonly getFirstName = () => this.getUserInfo()?.firstName ?? "";

  static readonly getLastName = () => this.getUserInfo()?.lastName ?? "";

  static readonly getUserName = () => this.getUserInfo()?.userName ?? "";

  static readonly getUserEmail = () => this.getUserInfo()?.userName ?? "";

  static readonly isInRole = (roleName: Role) => {
    const userInfo = this.getUserInfo();
    return !!userInfo && userInfo.roles.some(userRole => userRole.role?.name === roleName);

  }

  static readonly isInRoles = (roleNames: Role[]) => roleNames.some(roleName => this.isInRole(roleName));

  static readonly isSignedIn = () => {
    const { isSignedIn, userToken } = store.getState().authentication;
    return isSignedIn && !!userToken && !TokenService.isTokenExpired();
  }

  static readonly signout = () => forceLogout();

  updateProfile = async (model: UserModel) => {
    const ok = await this.update(model.id!, model);
    const loggedUser = await this.get(model.id ?? 0);
    store.dispatch(setUserInfo(loggedUser));
    return ok;
  }

  getUsers = async (oDataQuery: string): Promise<ODataResponse<UserModel>> => await new UserODataRepo().query(oDataQuery);

}

export default UserService;
