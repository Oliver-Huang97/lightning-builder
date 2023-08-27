import 'reflect-metadata';
import { MetaDataKeys } from '../enums';
import { AutoWiredInfo, ModuleMetaData } from '../interfaces';
import { BaseModel, BaseModule } from '../bases';

export function getAutoWiredList(target: Object): Array<AutoWiredInfo> {
  return Reflect.getMetadata(MetaDataKeys.InjectableAutoWired, target) || [];
}

export function addAutoWired(target: Object, propertyKey: string | symbol, name?: string): void {
  const autoWiredList = getAutoWiredList(target);
  const type = Reflect.getMetadata('design:type', target, propertyKey);
  autoWiredList.push({
    type,
    propertyKey,
    name,
  });
  Reflect.defineMetadata(MetaDataKeys.InjectableAutoWired, autoWiredList, target);
}

export function getModuleMetaData(module: typeof BaseModule): ModuleMetaData {
  return Reflect.getMetadata(MetaDataKeys.ModuleMetaData, module);
}

export function setModuleMetaData(target: typeof BaseModule, data: ModuleMetaData): void {
  Reflect.defineMetadata(MetaDataKeys.ModuleMetaData, data, target);
}

export function getInjectableName(target: Object): string | undefined {
  return Reflect.getMetadata(MetaDataKeys.InjectableName, target);
}

export function setInjectableName(target: Object, name: string): void {
  Reflect.defineMetadata(MetaDataKeys.InjectableName, name, target);
}

export function getModelBindModule(target: BaseModel): typeof BaseModule | undefined {
  return Reflect.getMetadata(MetaDataKeys.ModelBindModule, target);
}

export function setModelBindModule(target: BaseModel, module: typeof BaseModule) {
  Reflect.defineMetadata(MetaDataKeys.ModelBindModule, module, target);
}
