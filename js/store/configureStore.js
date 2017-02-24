import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducers from '../reducers'
import promise from './promise'

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

var createAppStore = applyMiddleware(thunk, promise, logger)(createStore);

function configureStore(){
  const store = createAppStore(reducers);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}

module.exports = configureStore;
