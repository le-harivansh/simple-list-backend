import { ConfigFactory } from '@nestjs/config';
import Joi from 'joi';
import registerConfiguration from './lib/register-configuration';

export interface ApplicationConfiguration extends ConfigFactory {
  port: number;
  cors: {
    origin: {
      web: string;
    };
  };
}

export default registerConfiguration<ApplicationConfiguration>('application', {
  port: {
    env: 'APPLICATION_PORT',
    rules: Joi.number().port().default(80),
  },
  cors: {
    origin: {
      web: {
        env: 'CORS_ORIGIN_WEB',
        rules: Joi.string().uri().required(),
      },
    },
  },
});
