import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './store/configureStore';
import AppWithNavigationState from './containers/RootContainer';

export const { store, persistor } = configureStore();

const App = () =>
  (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <AppWithNavigationState />
      </PersistGate>
    </Provider>
  );

export default App;
