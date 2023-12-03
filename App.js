
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/redux/store';
import { Provider as StoreProvider } from 'react-redux';
import Index from './src';

export default class App extends Component {
  render() {
    return (
      <StoreProvider store={store}>
        <NavigationContainer>
        <Index></Index>
        </NavigationContainer>
      </StoreProvider>
    )
  }
}