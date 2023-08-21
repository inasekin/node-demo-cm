import { IUserRepository } from './user.repository.interface';
import { UserEntity } from './user.entity';
import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { PrismaService } from '../db/prisma.service';

@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
	async create({ email, name, password }: UserEntity): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				name,
				password,
			},
		});
	}

	find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}
}
