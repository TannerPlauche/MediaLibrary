import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
// import {Link} from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import DrawerMenuItem from '../menu/DrawerMenuItem';
const menuData = [
    {
        title: 'HOME',
        route: 'home'
    },
    {
        title: 'MEDIA LIBRARY',
        route: 'medialibrary'
    }
];

class DrawerMenu extends Component {
    toggleOpen = () => {
        this.props.toggleOpen();
    }

    renderMenuItems() {
        let menuItems = menuData.map((item, index) => (
            <DrawerMenuItem key={index} title={item.title} route={item.route} toggleOpen={this.toggleOpen}/>
        ));
        return menuItems;
    }

    render() {


        return (

            <Drawer open={this.props.open}
                    docked={false}
                    onRequestChange={this.props.toggleOpen}>
                <MenuItem>TOOLS</MenuItem>
                <hr/>
                {this.renderMenuItems()}
            </Drawer>
        );
    }
}

export default DrawerMenu;