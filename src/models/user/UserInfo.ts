import { UserRoleModel } from "../../data/entities"

export interface UserInfo {
  id: string     // Supabase UUID
  userName: string
  roles: UserRoleModel[]
}
