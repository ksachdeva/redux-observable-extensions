# redux-observable-extensions

Useful extensions for [redux-observable](https://github.com/redux-observable/redux-observable)

```bash
npm install redux-observable-extensions --save
```

## Epic decorator

If you want to have your epic functions inside a class for e.g.

```typescript
class MyEpics {

  epic1$ = (action$: ActionsObservable<Action>) =>
    action$.ofType(MyActions.AN_ACTION_1)
      .mergeMap(() =>
        this.myService.doSomething()
          .map(res => this.myActions.anotherAction())
      );
      
  epic2$ = (action$: ActionsObservable<Action>) =>
    action$.ofType(MyActions.AN_ACTION_2)
      .mergeMap(() =>
        this.myService.doSomethingElse()
          .map(res => this.myActions.yetAnotherAction())
      );

  constructor(
     private myActions: MyActions,  
     private myService: MyService) {
  }
}
```

then you would something like this 

```typescript
import { createEpicMiddleware, combineEpics } from 'redux-observable';

const myEpics = ... // create the object or have it dependency injected

const combinedEpics = combineEpics<Action>(
  myEpics.epic1$,
  myEpics.epic2$
);

const middleware = [
  createEpicMiddleware(combinedEpics)
];

```

The Epic decorator introduced as part of this module let's you do following.

```typescript
import { Epic } from 'redux-observable-extensions';

class MyEpics {

  @Epic() epic1$ = (action$: ActionsObservable<Action>) =>
    action$.ofType(MyActions.AN_ACTION_1)
      .mergeMap(() =>
        this.myService.doSomething()
          .map(res => this.myActions.anotherAction())
      );
      
  @Epic() epic2$ = (action$: ActionsObservable<Action>) =>
    action$.ofType(MyActions.AN_ACTION_2)
      .mergeMap(() =>
        this.myService.doSomethingElse()
          .map(res => this.myActions.yetAnotherAction())
      );

  constructor(
     private myActions: MyActions,  
     private myService: MyService) {
  }
}
```

and when it comes the time to create the middleware simply do

```typescript
import { mergeEpics } from 'redux-observable-extensions';

const combinedEpics = mergeEpics<Action>(myEpics); 

const middleware = [
  createEpicMiddleware(combinedEpics)
];

```


