import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import AppContainer from './src/app-container';
import store from './src/common/store';
import { AppNavigator } from '@navigation';
import { API } from '@constants';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: API.BASE_URL,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <AppContainer>
            <AppNavigator />
          </AppContainer>
        </Provider>
      </ApolloProvider>
    </NavigationContainer>
  );
};

export default App;
