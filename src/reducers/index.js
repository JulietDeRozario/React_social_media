import userId from './userId';
import username from './username';
import {combineReducers} from 'redux';

const reducers = combineReducers({
  userId: userId,
  username: username
})

export default reducers;