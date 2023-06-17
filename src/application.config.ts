import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export type ApplicationConfiguration = {
  port: number;
};

export default registerAs<ApplicationConfiguration>('application', () => {
  const schema = Joi.object({
    port: Joi.number().default(3000),
  });

  const { value: validatedData, error: validationError } = schema.validate({
    port: process.env.APPLICATION_PORT,
  });

  if (validationError) {
    throw validationError;
  }

  return {
    port: validatedData.port,
  };
});
