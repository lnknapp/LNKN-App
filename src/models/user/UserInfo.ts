import { UserRoleModel } from "../../data/entities"

export interface UserInfo {
  id: number
  userName: string
  roles: UserRoleModel[]
}
