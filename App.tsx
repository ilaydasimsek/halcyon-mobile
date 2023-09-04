import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import AppContainer from './src/app-container';
import store from './src/common/store';
import { AppNavigator } from '@navigation';
import { API } from '@constants';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getUserCredentialsFromKeychain } from '@keychain';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

const httpLink = createHttpLink({
  uri: API.BASE_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const token = (await getUserCredentialsFromKeychain())?.token;
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `JWT ${token}` } : {}),
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  defaultOptions: {
    mutate: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <GestureHandlerRootView style={styles.container}>
            <AppContainer>
              <AppNavigator />
            </AppContainer>
          </GestureHandlerRootView>
        </Provider>
      </ApolloProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
