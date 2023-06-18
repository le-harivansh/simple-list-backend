import { ConfigFactory } from '@nestjs/config';
import Joi from 'joi';
import registerConfiguration from './lib/register-configuration';

export interface ApplicationConfiguration extends ConfigFactory {
  port: number;
};

export default registerConfiguration<ApplicationConfiguration>('application', {
  port: {
    env: 'APPLICATION_PORT',
    rules: Joi.number().port().default(80),
  },
});
