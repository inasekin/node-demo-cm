import { inject, injectable } from 'inversify';
import { PrismaClient, UserModel } from '@prisma/client';
import { TYPES } from '../types';
import { LoggerService } from '../logger/logger.service';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private loggerService: LoggerService) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.loggerService.log('[PrismaService] Успешно подключились к базе данных');
		} catch (e) {
			if (e instanceof Error) {
				this.loggerService.log('[PrismaService] Ошибка подключения к базе данных' + e.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
