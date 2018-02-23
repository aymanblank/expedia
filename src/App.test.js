import React from 'react';
import App from './App';
import '../__tests__/config';
import { mount } from 'enzyme';
import store from './store';

const payload = [{
  "offerDateRange": {
    "travelStartDate": [
      2018,
      3,
      21
    ],
    "travelEndDate": [
      2018,
      3,
      25
    ],
    "lengthOfStay": 4
  },
  "destination": {
    "regionID": "178286",
    "associatedMultiCityRegionId": "178286",
    "longName": "Miami (and vicinity), Florida, United States of America",
    "shortName": "Miami",
    "country": "United States of America",
    "province": "Florida",
    "city": "Miami",
    "tla": "FLL",
    "nonLocalizedCity": "Miami"
  },
  "hotelInfo": {
    "hotelId": "21973653",
    "hotelName": "Villa Lunablu",
    "localizedHotelName": "Villa Lunablu",
    "hotelDestination": "North Miami Beach",
    "hotelDestinationRegionID": "55169",
    "hotelLongDestination": "North Miami Beach,FL,USA",
    "hotelStreetAddress": "19921 NE 20th Ct",
    "hotelCity": "North Miami Beach",
    "hotelProvince": "FL",
    "hotelCountryCode": "USA",
    "hotelLatitude": 25.95986,
    "hotelLongitude": -80.16008,
    "hotelStarRating": "3.5",
    "hotelGuestReviewRating": 0,
    "hotelReviewTotal": 0,
    "hotelImageUrl": "https://images.trvl-media.com/hotels/22000000/21980000/21973700/21973653/3e11d449_t.jpg",
    "vipAccess": false,
    "isOfficialRating": false
  },
  "hotelPricingInfo": {
    "averagePriceValue": 470,
    "totalPriceValue": 1880,
    "crossOutPriceValue": 1970,
    "originalPricePerNight": 1970,
    "currency": "USD",
    "percentSavings": 76.14,
    "drr": false
  },
  "hotelUrls": {
    "hotelInfositeUrl": "https%3A%2F%2Fwww.expedia.com%2Fgo%2Fhotel%2Finfo%2F21973653%2F2018-03-21%2F2018-03-25",
    "hotelSearchResultUrl": "https%3A%2F%2Fwww.expedia.com%2Fgo%2Fhotel%2Fsearch%2FDestination%2F2018-03-21%2F2018-03-25%3FSearchType%3DDestination%26CityName%3DNorth+Miami+Beach%26RegionId%3D178286%26Selected%3D21973653"
  }
}];

describe('<App />', () => {
  it('renders without crashing', () => {
    // Testing the app
    const app = mount(<App />);

    // Testing the first button in app component
    app.find("FlatButton[label='Ayman Abu Khalifa']").simulate('click');

    // Testing dispatching gethotels action without data coming back
    const hotels = app.find("Hotels");
    hotels.instance().handleFilterBtnClick(null);

    const txt1 = hotels.find("TextField[hintText='Destination Name']");
    txt1.find('input').simulate('change', { target: { value: 'ABC' } });
    const date1 = hotels.find("DatePicker[hintText='Min Trip Start Date']");
    date1.find('input').simulate('change', { target: { value: new Date(2018, 1, 1) } });
    const date2 = hotels.find("DatePicker[hintText='Max Trip Start Date']");
    date2.find('input').simulate('change', { target: { value: new Date(2019, 1, 1) } });
    const txt2 = hotels.find("TextField[hintText='Length Of Stay']");
    txt2.find('input').simulate('change', { target: { value: '5' } });
    const txt3 = hotels.find("TextField[hintText='Min Star Rating']");
    txt3.find('input').simulate('change', { target: { value: '1' } });
    const txt4 = hotels.find("TextField[hintText='Max Star Rating']");
    txt4.find('input').simulate('change', { target: { value: '3' } });
    const txt5 = hotels.find("TextField[hintText='Min Total Rate']");
    txt5.find('input').simulate('change', { target: { value: '1' } });
    const txt6 = hotels.find("TextField[hintText='Max Total Rate']");
    txt6.find('input').simulate('change', { target: { value: '3' } });
    const txt7 = hotels.find("TextField[hintText='Min Guest Rating']");
    txt7.find('input').simulate('change', { target: { value: '1' } });
    const txt8 = hotels.find("TextField[hintText='Max Guest Rating']");
    txt8.find('input').simulate('change', { target: { value: '5' } });

    // Testing dispatching gethotels action with data
    store.dispatch({ type: 'GET_HOTELS', payload });
    hotels.instance().handleFilterBtnClick('click');

    txt1.find('input').simulate('change', { target: { value: '' } });
    txt2.find('input').simulate('change', { target: { value: 'ABC' } });
    date1.find('input').simulate('change', { target: { value: new Date(2018, 10, 10) } });
    hotels.instance().handleFilterBtnClick('click');

    hotels.instance().setState({ hotels: payload });

  });
});
