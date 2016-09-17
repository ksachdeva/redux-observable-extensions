import { merge } from 'rxjs/observable/merge';
import { Epic, ActionsObservable} from 'redux-observable';

import { getEpicKeys } from './metadata';

function flatten(list: any[]): any[] {
  return list.reduce((items: any[], next) => {
    if (Array.isArray(next)) {
      return items.concat(flatten(next));
    }
    return items.concat(next);
  }, []);
}

export function mergeEpics<T>(...epics: any[]): Epic<T> {
  return function(actions: ActionsObservable<T>, store) {
    const epicFns = flatten(epics).map(e => {
      const keys = getEpicKeys(e);
      return keys.map(k => e[k](actions, store));
    });

    return merge(...flatten(epicFns));
  };
}
