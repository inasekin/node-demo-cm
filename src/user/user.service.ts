import { IUserService } from './user.service.interface';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { UserEntity } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { injectable } from 'inversify';

@injectable()
export class UserService implements IUserService {
	async createUser({ email, name, password }: UserRegistrationDto): Promise<UserEntity | null> {
		const newUser = new UserEntity(email, name);
		await newUser.setPassword(password);
		return null;
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
