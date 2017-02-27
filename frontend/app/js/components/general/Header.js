import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {red900} from 'material-ui/styles/colors'
import DrawerMenu from './DrawerMenu';

export default class Header extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }

    toggleDrawer = () => {
        console.log(this.state);
        let toggled = !this.state.open;
        this.setState({open: toggled});
    };

    handleClose = () => this.setState({open: false});

    render() {
        return (
            <div>
                <AppBar style={{zIndex: 2, backgroundColor: red900}}
                        title="Sisel Tool Belt"
                        onLeftIconButtonTouchTap={this.toggleDrawer}/>
                <DrawerMenu open={this.state.open} toggleOpen={this.toggleDrawer}/>
            </div>
        )
    }
}
