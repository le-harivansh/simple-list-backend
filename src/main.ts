import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './application.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const application = await NestFactory.create(ApplicationModule);

  const configService = application.get(ConfigService);

  await application.listen(configService.get<number>('application.port')!);
}

bootstrap();
