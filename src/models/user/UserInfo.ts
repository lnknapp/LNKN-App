import { UserRoleModel } from "../../data/entities"

export interface UserInfo {
  id: number
  userName: string
  firstName: string
  lastName: string
  roles: UserRoleModel[]
}
