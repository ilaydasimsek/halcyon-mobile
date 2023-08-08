import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import AppContainer from './src/app-container';
import store from './src/common/store';
import { AppNavigator } from '@navigation';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppContainer>
          <AppNavigator />
        </AppContainer>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
