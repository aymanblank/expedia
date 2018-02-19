import {combineReducers} from 'redux';
import hotelReducer from './hotel';

export default combineReducers({
  hotels: hotelReducer
})