
import { combineReducers, } from 'redux';
import  homeReducer  from '../stores/home/reducer';
const rootReducer = combineReducers({
  history: homeReducer,
});



export { rootReducer };