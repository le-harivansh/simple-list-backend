import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './application.module';
import { ConfigService } from '@nestjs/config';
import { ApplicationConfiguration } from './application.config';

async function bootstrap() {
  const application = await NestFactory.create(ApplicationModule);

  const configService = application.get(ConfigService);

  application.enableCors({
    origin: [
      configService.getOrThrow<
        ApplicationConfiguration['cors']['origin']['web']
      >('application.cors.origin.web'),
    ],
  });

  const port =
    configService.getOrThrow<ApplicationConfiguration['port']>(
      'application.port',
    );

  await application.listen(port);
}

bootstrap();
