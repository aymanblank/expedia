import { LOADING } from '../actions/constants';

/*
*   Action for setting the state of loading into true or false by dispatching an action of type LOADING
*   load : boolean value representing loading or not
*/
export const loadHotels = (load) => dispatch => {
  dispatch({ type: LOADING, payload: load });
};
