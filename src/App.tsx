import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { Loading } from './components';
import { useLoading } from './hooks';
import { store } from './redux';
import Router from './router';

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

const MainApp = () => {
  const { isLoading } = useLoading();

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {isLoading && <Loading />}
    </>
  );
};
