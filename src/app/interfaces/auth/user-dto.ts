import { Role } from './role';

export interface UserDto {
  id: string;
  username: string;
  email: string;
  role: Role;
}
