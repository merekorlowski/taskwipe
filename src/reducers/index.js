import { combineReducers } from 'redux';
import sessionReducer from './session';
import projectReducer from './projects';
import taskReducer from './tasks';

export default combineReducers({
    sessionReducer,
    projectReducer,
    taskReducer
});