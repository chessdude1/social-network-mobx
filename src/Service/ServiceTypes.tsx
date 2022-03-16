export interface IProfile {
  userName: string;
  password: string;
  number: string;
  contacts: Array<{ number: string; userName: string }> | [];
}

export interface IUser {
  userName: string;
  number: string;
}

export interface AuthorizationData {
  number: string;
  password: string;
}
