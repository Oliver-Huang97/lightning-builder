import { ConstructorFunction, ModelOptions } from '../interfaces';

export function Model(options?: string | ModelOptions) {
  return function <T extends ConstructorFunction>(target: T) {};
}
