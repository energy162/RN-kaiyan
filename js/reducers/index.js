import {combineReducers} from 'redux'

module.exports = combineReducers({
  config: require('./config'),
  category: require('./category'),
  discovery: require('./discovery'),
});
