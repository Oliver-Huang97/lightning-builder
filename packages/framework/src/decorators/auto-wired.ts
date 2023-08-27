import { addAutoWired } from '../helpers/utils';

export function AutoWired(name?: string): PropertyDecorator {
  return (target, key) => {
    addAutoWired(target, key, name);
  };
}
