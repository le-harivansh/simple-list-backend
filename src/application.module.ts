import { Module } from '@nestjs/common';
import { ListModule } from './list/list.module';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from './application.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [applicationConfig],
    }),
    ListModule,
  ],
})
export class ApplicationModule {}
