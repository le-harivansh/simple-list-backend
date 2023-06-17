import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './application.module';
import { ConfigService } from '@nestjs/config';
import { ApplicationConfiguration } from './application.config';

async function bootstrap() {
  const application = await NestFactory.create(ApplicationModule);

  const configService = application.get(ConfigService);

  await application.listen(
    configService.getOrThrow<ApplicationConfiguration['port']>(
      'application.port',
    ),
  );
}

bootstrap();
