import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import mediaStore from '../../../stores/mediaStore';

const styles = {
    selected: {
        backgroundColor: '#22c5da'
    },
    menu: {
        maxHeight: 200,
        overflowX: 'scroll'
    }
};

export default class CampaignSelector extends Component {

    addOrRemoveCampaignToMediaItem(campaignId) {
        mediaStore.addOrRemoveCampaignToMediaItem(campaignId);
    }

    render() {

        let menuItems = mediaStore.mediaCampaigns.map((campaign, index) => (
            <MenuItem onClick={() => {
                this.addOrRemoveCampaignToMediaItem(campaign._id)
            }} key={index}
                      innerDivStyle={mediaStore.newMediaItem.campaigns.indexOf(campaign._id) > -1 ? styles.selected : {}}>
                {campaign.title}
            </MenuItem>
        ));


        return (
            <div>
                <Paper style={styles.menu} zDepth={1}>
                    {/*<Menu value={menuItems}/>*/}
                    <Menu>
                        {menuItems}
                    </Menu>
                </Paper>
            </div>
        )
    }
}