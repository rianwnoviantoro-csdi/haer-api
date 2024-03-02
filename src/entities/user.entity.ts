export interface IUser {
  id: string;
  fistName: string;
  lastName: string;
  email: string;
  password: string;
  refreshToken: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
