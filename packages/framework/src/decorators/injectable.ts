import { setInjectableName } from '../helpers/utils';
import { InjectableOptions } from '../interfaces';

export function Injectable(options?: string | InjectableOptions): ClassDecorator {
  return function (target: Object) {
    if (typeof options === 'object' && options) {
      setInjectableName(target, options.name);
    } else if (typeof options === 'string') {
      setInjectableName(target, options);
    }
  };
}
