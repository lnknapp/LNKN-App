import { store, setUserInfo } from '../../app/store';
import { ODataResponse, UserModel } from '../../data/entities';
import { UserODataRepo, UserRepo } from '../../data/repo';
import { Role } from '../../models';
import { BaseEntityService } from '../../services/BaseEntityService';
import { forceLogout } from '../../utils';
import { supabase } from '../../lib/supabase';

export class UserService extends BaseEntityService<UserModel, UserRepo, UserODataRepo> {
  constructor() {
    super(new UserRepo(), new UserODataRepo());
  }

  static readonly getUserInfo = () => store.getState().authentication.userInfo;
  static readonly getUserToken = () => store.getState().authentication.userToken;
  static readonly getTokenData = () => store.getState().authentication.tokenData;

  static readonly getDisplayName = () => UserService.getUserInfo()?.userName ?? '';
  static readonly getId = (): string => UserService.getUserInfo()?.id ?? '';
  static readonly getUserName = () => UserService.getUserInfo()?.userName ?? '';
  static readonly getUserEmail = () => UserService.getUserInfo()?.userName ?? '';

  static readonly isInRole = (roleName: Role) => {
    const userInfo = UserService.getUserInfo();
    if (!userInfo?.roles) return false;
    return userInfo.roles.some((userRole) => userRole.role?.name === roleName);
  };

  static readonly isInRoles = (roleNames: Role[]) => roleNames.some((r) => UserService.isInRole(r));

  static readonly isSignedIn = () => {
    const { isSignedIn, userToken } = store.getState().authentication;
    // Trust the Redux state; Supabase auto-refreshes tokens in the background
    return isSignedIn && !!userToken;
  };

  static readonly signout = () => forceLogout();

  updateProfile = async (model: UserModel) => {
    const ok = await this.update(model.id!, model);
    const loggedUser = await this.get(model.id ?? 0);
    store.dispatch(setUserInfo(loggedUser));
    return ok;
  };

  getUsers = async (oDataQuery: string): Promise<ODataResponse<UserModel>> =>
    new UserODataRepo().query(oDataQuery);
}

export default UserService;
