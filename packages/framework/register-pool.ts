import { InjectableOptions, ModelOptions, ModuleOptions } from "./interfaces";

export class RegisterPool {
  private static moduleRecords = new WeakMap<Function, ModelOptions>();

  private static modelMap = new WeakMap<Function, ModelOptions>();

  private static injectableMap = new WeakMap<Function, InjectableOptions>();

  public static registerModule(module: Function, options: ModuleOptions) {
    if (Array.isArray(options.models)) {
    }

    if (Array.isArray(options.providers)) {
    }
  }

  public static registerModel(
    model: Function,
    options?: string | ModelOptions
  ) {
    if (typeof options === "object") {
      this.modelMap.set(model, options);
    } else if (typeof options === "string") {
      this.modelMap.set(model, { name: options });
    }
  }

  public static registerInjectable(
    injectable: Function,
    options?: string | InjectableOptions
  ) {
    if (typeof options === "object") {
      this.injectableMap.set(injectable, options);
    } else if (typeof options === "string") {
      this.injectableMap.set(injectable, { name: options });
    }
  }

  public getInjectable(name: string) {}
}
