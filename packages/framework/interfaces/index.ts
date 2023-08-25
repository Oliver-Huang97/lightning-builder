export interface ModelOptions {
  name?: string;
}

export interface InjectableOptions {
  name?: string;
}

export interface AutoWiredOptions {
  name?: string;
}

export interface ModuleOptions {
  models?: Array<Function>;
  providers?: Array<Function>;
}
