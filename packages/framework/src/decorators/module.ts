import { ModuleInstanceInfo, ModuleOptions } from '../interfaces';
import { BaseModule } from '../bases';
import { getInjectableName, getModuleMetaData, setModuleMetaData } from '../helpers/utils';
import { createInstance } from '../helpers/create-instance';

export function Module(options: ModuleOptions) {
  return function <T extends typeof BaseModule>(target: T) {
    const instances: Array<ModuleInstanceInfo> = [];

    options.imports?.forEach((item) => {
      instances.push(...getModuleMetaData(item).instances);
    });

    options.providers?.forEach((provider) => {
      const instance = new provider();
      instances.push({
        name: getInjectableName(provider),
        instance: createInstance(target, instance),
      });
    });

    setModuleMetaData(target, Object.assign({ instances }, options));
  };
}
