/* eslint-disable no-underscore-dangle */

import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import sagas from './sagas';

export default function storeCreator() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();
  const enhancers = [
    applyMiddleware(sagaMiddleware),
  ];

  const store = createStore(rootReducer, {}, composeEnhancers(...enhancers));

  store.injectSagas = (sagasToInject) => {
    Object.keys(sagasToInject).forEach((sagaKey) => {
      sagaMiddleware.run(sagasToInject[sagaKey]);
    });
  };

  store.injectSagas(sagas);

  return store;
}
