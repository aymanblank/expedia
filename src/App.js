import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { cyan500 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import { Provider } from 'react-redux';
import store from './store';
import Hotels from './components/Hotels';
import Loading from './components/Loading';

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 50,
  },
});

class App extends Component {
  constructor(){
    super();

    //initial state
    this.state = {
      load : false
    };

    // function to handle any changes to the store
    // currently only checking for loading state and assign it to load in this.state
    const handleChange = () => {
      const state = store.getState();
      this.setState({ load: state.loading });
    };

    // subscribing and listening to store events
    store.subscribe(handleChange);
  }

  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <Loading load={this.state.load} />
            <MuiThemeProvider muiTheme={muiTheme}>
              <AppBar
                iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                iconElementRight={
                  <FlatButton 
                    label="Ayman Abu Khalifa" 
                    onClick={event => window.open('https://www.linkedin.com/in/ayman-abu-khalifa-22bb4a94/')} 
                  />
                }
                title="Expedia Coding Exercise"
              />
            </MuiThemeProvider>
            <MuiThemeProvider muiTheme={muiTheme}>
              <Hotels />
            </MuiThemeProvider>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
