import { BaseModule } from '../bases';

export type ConstructorFunction<T = any> = { new (...args: T[]): T } & any;

export interface ModelOptions {
  name: string;
}

export interface InjectableOptions {
  name: string;
}

export interface AutoWiredOptions {
  name: string;
}

export interface ModuleOptions {
  imports?: Array<typeof BaseModule>;
  providers: Array<ConstructorFunction>;
}

export interface AutoWiredInfo {
  propertyKey: string | symbol;
  type: Function;
  name?: string;
}

export interface ModuleInstanceInfo {
  name?: string;
  instance: Object;
}

export interface ModuleMetaData extends ModuleOptions {
  instances: Array<ModuleInstanceInfo>;
}
