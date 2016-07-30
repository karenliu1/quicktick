import React, { Component } from 'react';
import { Provider } from 'react-redux'
import {
  AppRegistry,
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { loadSessions } from './src/actions/sessions';
import App from './src/components/App';
import appReducer from './src/reducers';

const store = createStore(appReducer, applyMiddleware(thunk));
store.dispatch(loadSessions());

class QuickTick extends Component {
  render() {
    return <Provider store={ store }>
      <App />
    </Provider>;
  }
}

AppRegistry.registerComponent('main', () => QuickTick);
