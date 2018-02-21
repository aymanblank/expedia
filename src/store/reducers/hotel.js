import { GET_HOTELS } from '../actions/constants';

/*
*   The reducer responsible for GET_HOTELS action
*   state : default state
*   action : object containing {type, payload} (type : action constant) (payload : any data that is passed by the dispatch)
*/
const hotelReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_HOTELS:
      return payload;
    default:
      return state;
  };
};

export default hotelReducer;
