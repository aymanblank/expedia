import Hotels from './Hotels'
import { connect } from 'react-redux'
import { getHotels } from '../../store/actions/hotels'
import { loadHotels } from '../../store/actions/loading'

/*
*   Any time the store is updated, mapStateToProps will be called. 
*	The results of mapStateToProps must be a plain object, which will be merged into the component’s props.
*	If you don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps.
*   state : current store state 
*/
const mapStateToProps = state => 
	({
		hotels: state.hotels
	})

/*
*   If an object is passed, each function inside it is assumed to be a Redux action creator. 
*	An object with the same function names, but with every action creator wrapped into a dispatch call 
*	so they may be invoked directly, will be merged into the component’s props.
*   dispatch : method for dispatching actions to the store
*/
const mapDispatchToProps = dispatch =>
	({
		getHotels: params => getHotels(params)(dispatch),
		loadHotels: (load) => loadHotels(load)(dispatch)
	})

export default connect(mapStateToProps, mapDispatchToProps)(Hotels)
