// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import storage from 'redux-persist/lib/storage';
import { AsyncStorage } from 'react-native';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const persistConfig = {
    key: 'root',
    blacklist: [ ],
    storage: AsyncStorage,
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    undefined,
    compose(
      applyMiddleware(logger, sagaMiddleware),
    )
  );

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = rootReducer; 
      store.replaceReducer(nextRootReducer);
    });
  }

  let persistor = persistStore(store)
  return { store, persistor }
}
