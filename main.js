import React, { Component } from 'react';
import { Provider } from 'react-redux'
import {
  AppRegistry,
} from 'react-native';
import { createStore } from 'redux';

import App from './src/components/App';
import appReducer from './src/reducers';

const store = createStore(appReducer);

class QuickTick extends Component {
  render() {
    return <Provider store={ store }>
      <App />
    </Provider>;
  }
}

AppRegistry.registerComponent('main', () => QuickTick);
