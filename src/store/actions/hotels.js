import { GET_HOTELS } from './constants';
import axios from 'axios';

// the node js server api url for getting hotels
const API = process.env.NODE_ENV === 'production' ? 'https://polar-dawn-15847.herokuapp.com/api/hotels' : 'http://localhost:5000/api/hotels';

/*
*   Action for calling hotels api and dispatch an action of type GET_HOTELS containing the hotels received 
*   from the server response
*   params : the params that would be sent to the api
*/
export const getHotels = (params) => dispatch => {
  return axios.post(API, params)
    .then(response => {
      if (response.data.offers.Hotel) {
        dispatch({ type: GET_HOTELS, payload: response.data.offers.Hotel });
      } else {
        dispatch({ type: GET_HOTELS, payload: [] });
      }
    })
    .catch(error => {
      console.warn('error', error);
    });
};
