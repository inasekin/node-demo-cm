import { UserRegistrationDto } from './dto/user-registration.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserModel } from '@prisma/client';

export interface IUserService {
	createUser: (dto: UserRegistrationDto) => Promise<UserModel | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
