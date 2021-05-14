import {setAutoFreeze} from 'immer';
import {applyMiddleware, compose, createStore} from 'redux';
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import createReducer from './createReducer';
import rootSaga from './saga';

setAutoFreeze(false);

export function configureStore(initialState = {}) {
  let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const reduxSagaMonitorOptions = {};

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  const middleware = [sagaMiddleware];

  const enhancers = [applyMiddleware(...middleware)];

  const rootReducer = createReducer();

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

const store = configureStore();
const persistor = persistStore(store);

export {store, persistor};
