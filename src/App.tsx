import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import Loading from './components/molecules/loading';
import { useLoading } from './hooks/useLoading';
import { store } from './redux/store';
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
