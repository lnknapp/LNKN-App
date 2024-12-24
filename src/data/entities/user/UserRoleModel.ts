import { RoleModel } from './RoleModel';

export interface UserRoleModel {
  id: number;

  userId: number;
  roleId: number;
  role?: RoleModel;
}

export default UserRoleModel;
