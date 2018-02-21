import { combineReducers } from 'redux';
import hotelReducer from './hotel';
import loadingReducer from './loading';

export default combineReducers({
  loading: loadingReducer,
  hotels: hotelReducer
});
