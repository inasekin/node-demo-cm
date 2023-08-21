import { UserEntity } from './user.entity';
import { UserModel } from '@prisma/client';

export interface IUserRepository {
	create: (user: UserEntity) => Promise<UserModel>;
	find: (email: string) => Promise<UserModel | null>;
}
