import { IUserService } from './user.service.interface';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { UserEntity } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IUserRepository } from './user.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
	) {}
	async createUser({ email, name, password }: UserRegistrationDto): Promise<UserModel | null> {
		const newUser = new UserEntity(email, name);
		const salt = this.configService.get<number>('SALT');
		await newUser.setPassword(password, Number(salt));

		const existedUser = await this.userRepository.find(email);

		if (existedUser) {
			return null;
		}

		return this.userRepository.create(newUser);
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
