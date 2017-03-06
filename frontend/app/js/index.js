import React, {Component} from 'react';
import reactDOM from 'react-dom';
import { Router, IndexRoute, Route, Link, hashHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Wrapper from './containers/Wrapper';
import HomeContainer from './containers/HomeContainer';
import MediaLibraryContainer from './containers/MediaLibraryContainer';
injectTapEventPlugin();
import {red900, red500} from 'material-ui/styles/colors'

const muiTheme = getMuiTheme({
    datePicker: {
        selectColor: red500,
    },
});

class App extends Component{
    render(){
        return(
            <Router history={hashHistory}>
                <Route path="/"  component={Wrapper}>
                    <IndexRoute component={HomeContainer}/>
                    <Route path="home" component={HomeContainer}/>
                    <Route path="medialibrary" component={MediaLibraryContainer}/>
                </Route>
            </Router>
        )
    }
}


class Main extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <App/>
            </MuiThemeProvider>
        )
    }
}

reactDOM.render(<Main/>, document.getElementById("app"));