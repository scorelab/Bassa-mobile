import { createStore, applyMiddleware, compose } from 'redux';
import { AsyncStorage } from 'react-native';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';
import { navMiddleware } from '../containers/RootContainer';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const persistConfig = {
    key: 'root',
    blacklist: ['nav'],
    storage: AsyncStorage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    undefined,
    compose(applyMiddleware(logger, navMiddleware, sagaMiddleware)),
  );

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = rootReducer;
      store.replaceReducer(nextRootReducer);
    });
  }

  const persistor = persistStore(store);
  return { store, persistor };
}
