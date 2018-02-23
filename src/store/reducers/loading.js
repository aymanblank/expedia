import { LOADING } from '../actions/constants';

/*
*   The reducer responsible for LOADING action
*   state : default state
*   action : object containing {type, payload} (type : action constant) (payload : any data that is passed by the dispatcher)
*/
const loadingReducer = (state = false, { type, payload }) => {
  switch (type) {
    case LOADING:
      return payload;
    default: break;
  };
  return state;
};

export default loadingReducer;
