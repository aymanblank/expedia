import {GET_HOTELS} from './constants';
import axios from 'axios';

export const getHotels = () => dispatch => {
    return axios.post('/api/hotels', {
        
    })
    .then(function (hotels) {
        dispatch({type: GET_HOTELS, payload: hotels})
    })
    .catch(function (error) {
        console.warn('error',error);
    });
}