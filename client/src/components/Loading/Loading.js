import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

class Loading extends Component {
    constructor(){
        super();

        // setting initial state
        this.state = {
           loading: false
        };
    }

    componentDidMount(){
        this.setState({loading: this.props.loading});
    }

    render() {
        return this.props.load ? (
            <div style={styles.container}>
                <CircularProgress size={80} thickness={5} style={styles.circularProgress} />
            </div>
        ) : null        
    }
}

/*
*   styles variable that contains all styles needed for the components in the render function
*/
const styles = {
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 999,
        backgroundColor: 'rgba(0, 0, 0, 0.13)'
    },
    circularProgress: {
        position: 'absolute',
        left: 0,
        right: 0,
        margin: 'auto',
        top: '50%',
    }
};

export default Loading;
