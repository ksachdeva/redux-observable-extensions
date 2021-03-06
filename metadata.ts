import 'reflect-metadata';

const METADATA_KEY = '@redux/rx/epics';

export function Epic(): PropertyDecorator {
  return function(target: any, propertyName: string) {
    if (!Reflect.hasOwnMetadata(METADATA_KEY, target)) {
      Reflect.defineMetadata(METADATA_KEY, [], target);
    }

    const effects = Reflect.getOwnMetadata(METADATA_KEY, target);

    Reflect.defineMetadata(METADATA_KEY, [...effects, propertyName], target);
  };
}

export function getEpicKeys(instance: any): string[] {
  const target = Object.getPrototypeOf(instance);

  if (!Reflect.hasOwnMetadata(METADATA_KEY, target)) {
    return [];
  }

  return Reflect.getOwnMetadata(METADATA_KEY, target);
}
