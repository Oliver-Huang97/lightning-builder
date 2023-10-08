import { BaseModule } from '../bases';
import { getAutoWiredList, getModuleMetaData } from './utils';

export function createInstance<T extends Object>(module: typeof BaseModule, target: T): T {
  const instances = getModuleMetaData(module)?.instances || [];
  getAutoWiredList(target).forEach((item) => {
    const itemInstances = instances.filter((i) => {
      if (!(item.type && i.instance instanceof item.type)) {
        return false;
      }
      return item.name ? item.name === i.name : true;
    });

    if (!itemInstances?.length) {
      throw new Error(
        `Can\'t not AutoWired ${item.propertyKey.toString()} in ${item.type?.toString()}, please provider it in module`,
      );
    }

    if (itemInstances.length > 1) {
      throw new Error(
        `Can\'t not AutoWired ${item.propertyKey.toString()} in ${item.type?.toString()}, because it has more than 1 provider`,
      );
    }

    Reflect.defineProperty(target, item.propertyKey, {
      get() {
        return itemInstances[0].instance;
      },
    });
  });
  return target;
}
