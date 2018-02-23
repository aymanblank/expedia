import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import { GridList, GridTile } from 'material-ui/GridList';

/*
*   styles variable that contains all styles needed for the components in the render function
*/
const styles = {
  container: {
    display: 'flex',
    alignSelf: 'flex-start',
    flexDirection: 'column',
    margin: 16
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  gridList: {
    width: '100%',
  },
};

class Hotels extends Component {
  constructor() {
    super();

    // setting initial state
    this.state = {
      destinationName: '',
      destinationNameError: '',
      minTripStartDate: null,
      maxTripStartDate: null,
      lengthOfStay: '',
      lengthOfStayError: '',
      minStarRating: '',
      minStarRatingError: '',
      maxStarRating: '',
      maxStarRatingError: '',
      minTotalRate: '',
      minTotalRateError: '',
      maxTotalRate: '',
      maxTotalRateError: '',
      minGuestRating: '',
      minGuestRatingError: '',
      maxGuestRating: '',
      maxGuestRatingError: '',
      hotels: []
    };

    // Binding event listeners to this scope
    this._handleTextChanged = this._handleTextChanged.bind(this);
    this._handleNumberChanged = this._handleNumberChanged.bind(this);
    this.handleFilterBtnClick = this.handleFilterBtnClick.bind(this);
    this._checkStateAndGetRequest = this._checkStateAndGetRequest.bind(this);
  }

  componentWillMount() {
    this.setState({ hotels: this.props.hotels || [] });
  }

  /*
  *   handle text field value change and assign it to the state if it checks out
  *   chane : Object containing the field name and value 
  *   error : (optional) error text that appears underneath the text field
  */
  _handleTextChanged(change, error = '') {
    for (var name in change) {
      if (change[name] && change[name].trim().length > 0) {
        this.setState({ [name]: change[name] });
      } else {
        this.setState({ [name]: '', [name + 'Error']: error });
      }
    }
  }

  /*
  *   handle text field value change and assign it to the state if it checks out, it should be numeric
  *   chane : Object containing the field name and value 
  *   error : (optional) error text that appears underneath the text field
  */
  _handleNumberChanged(change, error = '') {
    for (var name in change) {
      if (!isNaN(change[name])) {
        this.setState({ [name]: change[name] });
      } else {
        this.setState({ [name]: '', [name + 'Error']: error });
      }
    }
  }

  /*
  *   format Date object into a simple date string 'YYYY-MM-DD'
  *   date : date Object
  *   @return formated date string
  */
  _formatDate(date) {
    const month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
    const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
    return `${date.getFullYear()}-${month}-${day}`;
  }

  /*
  *   checks if all filled fields contains a valid value and removes unwanted fields
  *   @return request object 
  */
  _checkStateAndGetRequest() {
    let request = {};
    if (this.state.destinationName.length > 0) {
      request.destinationName = this.state.destinationName;
    }
    if (this.state.minTripStartDate !== null) {
      request.minTripStartDate = this._formatDate(this.state.minTripStartDate);
    }
    if (this.state.maxTripStartDate !== null) {
      request.maxTripStartDate = this._formatDate(this.state.maxTripStartDate);
    }
    if (this.state.lengthOfStay > 0) {
      request.lengthOfStay = this.state.lengthOfStay;
    }
    if (this.state.minStarRating > 0) {
      request.minStarRating = this.state.minStarRating;
    }
    if (this.state.maxStarRating > 0) {
      request.maxStarRating = this.state.maxStarRating;
    }
    if (this.state.minTotalRate > 0) {
      request.minTotalRate = this.state.minTotalRate;
    }
    if (this.state.maxTotalRate > 0) {
      request.maxTotalRate = this.state.maxTotalRate;
    }
    if (this.state.minGuestRating > 0) {
      request.minGuestRating = this.state.minGuestRating;
    }
    if (this.state.maxGuestRating > 0) {
      request.maxGuestRating = this.state.maxGuestRating;
    }

    return request;
  }

  /*
  *   handle filter button click event.
  *   dispach getHotels event to retrieve filtered hotels from the backend and then assign
  *   them to the state from the store to update the UI 
  *   event : Click event targeting the button
  */
  handleFilterBtnClick(event) {
    this.props.loadHotels(true);
    this.props.getHotels(this._checkStateAndGetRequest())
      .then(() => {
        this.props.loadHotels(false);
        this.setState({ hotels: this.props.hotels });
      });
  }

  /*
  *   replace the image url with one that has a higher resolution
  *   img : image url
  *   @return image url string
  */
  _getImageSource(img) {
    return img.replace('_t.jpg', '_l.jpg');
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.row}>
          <TextField
            errorText={this.state.destinationNameError}
            hintText="Destination Name"
            onChange={(event, destinationName) => this._handleTextChanged({ destinationName })}
            value={this.state.destinationName}
          />
          <RaisedButton
            label="Filter"
            onClick={this.handleFilterBtnClick}
            primary
            style={{ marginBottom: 16 }} 
          />
        </div>
        <div style={styles.row}>
          <DatePicker
            hintText="Min Trip Start Date"
            onChange={(event, minTripStartDate) => this.setState({ minTripStartDate })}
            value={this.state.minTripStartDate}
          />
          <DatePicker
            hintText="Max Trip Start Date"
            onChange={(event, maxTripStartDate) => this.setState({ maxTripStartDate })}
            value={this.state.maxTripStartDate}
          />
          <TextField
            errorText={this.state.lengthOfStayError}
            hintText="Length Of Stay"
            onChange={(event, lengthOfStay) => this._handleNumberChanged({ lengthOfStay })}
            value={this.state.lengthOfStay}
          />
        </div>
        <div style={styles.row}>
          <TextField
            errorText={this.state.minStarRatingError}
            hintText="Min Star Rating"
            onChange={(event, minStarRating) => this._handleNumberChanged({ minStarRating })}
            value={this.state.minStarRating}
          />
          <TextField
            errorText={this.state.maxStarRatingError}
            hintText="Max Star Rating"
            onChange={(event, maxStarRating) => this._handleNumberChanged({ maxStarRating })}
            value={this.state.maxStarRating}
          />
          <TextField
            errorText={this.state.minTotalRateError}
            hintText="Min Total Rate"
            onChange={(event, minTotalRate) => this._handleNumberChanged({ minTotalRate })}
            value={this.state.minTotalRate}
          />
        </div>
        <div style={styles.row}>
          <TextField
            errorText={this.state.maxTotalRateError}
            hintText="Max Total Rate"
            onChange={(event, maxTotalRate) => this._handleNumberChanged({ maxTotalRate })}
            value={this.state.maxTotalRate}
          />
          <TextField
            errorText={this.state.minGuestRatingError}
            hintText="Min Guest Rating"
            onChange={(event, minGuestRating) => this._handleNumberChanged({ minGuestRating })}
            value={this.state.minGuestRating}
          />
          <TextField
            errorText={this.state.maxGuestRatingError}
            hintText="Max Guest Rating"
            onChange={(event, maxGuestRating) => this._handleNumberChanged({ maxGuestRating })}
            value={this.state.maxGuestRating}
          />
        </div>
        <div style={styles.row}>
          {this.state.hotels.length > 0 ?
            <GridList
              cellHeight={180}
              cols={5}
              style={styles.gridList}
            >
              <Subheader>Hotels</Subheader>
              {this.state.hotels.map((hotel) => (
                <GridTile
                  key={hotel.hotelInfo.hotelId}
                  subtitle={<span>In <b>{hotel.hotelInfo.hotelCity}</b></span>}
                  title={hotel.hotelInfo.hotelName}
                >
                  <img 
                    alt={hotel.hotelInfo.hotelName} 
                    src={this._getImageSource(hotel.hotelInfo.hotelImageUrl)}                     
                  />
                </GridTile>
              ))}
            </GridList>
            :
            <h3>No Results Found</h3>
          }
        </div>
      </div>
    );
  }
}

Hotels.propTypes = {
  getHotels: PropTypes.func,
  hotels: PropTypes.array,
  loadHotels: PropTypes.func
};

export default Hotels;
