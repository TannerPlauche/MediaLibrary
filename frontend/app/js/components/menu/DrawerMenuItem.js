import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';

const styles = {
    menuTextStyle: {
        color: 'black',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: 23

    }
};

const DrawerMenuItem = (props) => (
    <div >
        <MenuItem style={{display: "flex", justifyContent:"center", alignItems: "center"}}>
            <Link style={styles.menuTextStyle}
                  to={props.route}
                  onClick={props.toggleOpen}>{props.title}</Link>
        </MenuItem>
        <hr/>
    </div>
);

export default DrawerMenuItem;