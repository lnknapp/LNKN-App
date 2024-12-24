
export abstract class UserModel {
  id: number | undefined;
  userName: string | undefined;
  email: string | undefined;

  firstName?: string;
  lastName?: string;
}

export default UserModel;
