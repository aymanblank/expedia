import {GET_HOTELS} from '../actions/constants'

const hotelReducer = (state = [], {type, payload}) => {
    switch (type) {
      case GET_HOTELS:
        return payload
      default:
        return state
    }
}

export default hotelReducer;