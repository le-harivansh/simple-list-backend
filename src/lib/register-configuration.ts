import { ConfigFactory, registerAs } from '@nestjs/config';
import Joi from 'joi';

type JoiConstraints = Joi.SchemaLike | Joi.SchemaLike[];

type EnvironmentVariableNameProperty = 'env'; // refers to the property name pointing to the environment variable's name in the `EnvironmentVariableRuleObject`
type EnvironmentVariableRulesProperty = 'rules'; // refers to the property name pointing to the environment variable's joi constraints in the `EnvironmentVariableRuleObject`

type EnvironmentVariableRuleObject = { env: string; rules: JoiConstraints };

// The acceptable types for the environment variables' values
type EnvironmentValue = string | number | boolean;

export type ConfigurationMap<
  ConfigurationInterface extends EnvironmentValue | Record<string, any>,
> = ConfigurationInterface extends EnvironmentValue
  ? EnvironmentVariableRuleObject
  : {
      [Property in keyof ConfigurationInterface]: ConfigurationMap<
        ConfigurationInterface[Property]
      >;
    };

type GetMapOf<
  T,
  U extends keyof EnvironmentVariableRuleObject,
> = T extends EnvironmentValue
  ? U extends EnvironmentVariableNameProperty
    ? string
    : U extends EnvironmentVariableRulesProperty
    ? JoiConstraints
    : never
  : { [Property in keyof T]: GetMapOf<T[Property], U> };

type ReturnMap<
  T,
  U extends keyof EnvironmentVariableRuleObject,
> = U extends EnvironmentVariableNameProperty
  ? GetMapOf<T, EnvironmentVariableNameProperty>
  : U extends EnvironmentVariableRulesProperty
  ? GetMapOf<T, EnvironmentVariableRulesProperty>
  : never;

type TransformerFunctionArgument<
  U extends keyof EnvironmentVariableRuleObject,
> = U extends EnvironmentVariableNameProperty
  ? string
  : U extends EnvironmentVariableRulesProperty
  ? JoiConstraints
  : never;

/**
 * Similar to @nestjs/config::registerAs, but also validates the environment values passed to it.
 *
 * @param namespace The namespace/key/token under which the configuration will be stored
 * @param configurationMap An object containing the property to add to the configuration, its associated environment variable key, and validation rules.
 *        e.g.:
 *        ```ts
 *              {
 *                host: {
 *                  env: 'APPLICATION_HOST',
 *                  rules: Joi.string().hostname().required()
 *                },
 *                jwt: {
 *                  accessToken: {
 *                    duration: {
 *                      env: 'JWT_ACCESS_TOKEN_DURATION',
 *                      rules: Joi.string().default('15 minutes')
 *                    }
 *                  }
 *                }
 *              }
 *        ```
 * @type T The type of the configuration object that will be returned by the validation.
 */
export default function registerConfiguration<T extends ConfigFactory>(
  namespace: string,
  configurationMap: ConfigurationMap<T>,
) {
  return registerAs(namespace, (): T => {
    const schema = Joi.object<T>(
      filterAndTransformConfigurationForProperty<
        T,
        EnvironmentVariableRulesProperty
      >('rules', configurationMap) as Joi.SchemaMap<T>,
    );

    const { value: validatedConfig, error } = schema.validate(
      filterAndTransformConfigurationForProperty<
        T,
        EnvironmentVariableNameProperty
      >(
        'env',
        configurationMap,
        (environmentVariable: string) => process.env[environmentVariable],
      ),
    );

    if (error) {
      throw new Joi.ValidationError(
        `In ${namespace} configuration - ${error.message}`,
        error.details,
        error._original,
      );
    }

    return validatedConfig;
  });
}

/**
 * Create a new configuration object using the configurationMap; where the new configuration object's values are equal to the property from which they
 * were harvested.
 *
 * e.g.:
 * ```ts
 *    filterConfigurationForProperty('env', { one: { env: 'ONE', rules: Joi.number() }, two: { three: { env: 'THREE', rules: Joi.string() } } }) ==> { one: 'ONE', two: { three: 'THREE' } }
 *    filterConfigurationForProperty('rules', { one: { env: 'ONE', rules: Joi.number() }, two: { three: { env: 'THREE', rules: Joi.string() } } }) ==> { one: Joi.number(), two: { three: Joi.string() } }
 * ```
 *
 * @param propertyToFilter The property to filter for (either 'env' or 'rules').
 * @param configurationMap The configuration object to filter through.
 * @param transformer The transformer to pass the retrieved value (from the property `propertyToFilter`) to.
 *
 * @returns A new configuration object where the 'ultimate' values' of the properties are equal to the values of either 'env' or 'rules' - depending of the propertyToFilter argument.
 */
export const filterAndTransformConfigurationForProperty = <
  T extends Record<string, any>,
  U extends keyof EnvironmentVariableRuleObject,
>(
  propertyToFilter: U,
  configurationMap: ConfigurationMap<T> & Record<string, any>,
  transformer: (value: TransformerFunctionArgument<U>) => unknown = (value) =>
    value,
): ReturnMap<T, U> => {
  return Object.keys(configurationMap)
    .map((property) => {
      const isEnvRulesObject = isSimilar(
        Object.keys(configurationMap[property]),
        ['env', 'rules'] as [
          EnvironmentVariableNameProperty,
          EnvironmentVariableRulesProperty,
        ],
      );

      if (isEnvRulesObject) {
        return {
          [property]: transformer(configurationMap[property][propertyToFilter]),
        };
      } else {
        return {
          [property]: filterAndTransformConfigurationForProperty<T[keyof T], U>(
            propertyToFilter,
            configurationMap[property],
            transformer,
          ),
        };
      }
    })
    .reduce((previous, next) => ({ ...previous, ...next })) as ReturnMap<T, U>;
};

/**
 * Checks whether two arrays have the same items
 */
export function isSimilar(a: unknown[], b: unknown[]): boolean {
  return a.length === b.length && a.every((item) => b.includes(item));
}
