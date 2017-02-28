import React, {Component}from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import Download from 'material-ui/svg-icons/file/file-download'
import Image from 'material-ui/svg-icons/image/image';

import {red900, red500} from 'material-ui/styles/colors'

const styles = {
    card: {
        display: 'flex',
        flex: 1,
        minWidth: 300,
        maxWidth: 500,
        margin: 10
    },
    detailSection: {
        backgroundColor: "lightgray"
    },
    downloadAnchor:{
        marginleft: 15
    }
};

/**
 * This component is designed to fit in a Bootstrap row.
 */
export default class videoMediaCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    toggleExpand = () => {
        let toggledExpand = !this.state.expanded;
        this.setState({expanded: toggledExpand});
    };

    render() {
        return (
            <Card style={styles.card} expanded={this.state.expanded} onExpandChange={this.toggleExpand}>
                <CardHeader avatar={<Image/>} title="Test Card" subtitle="Test Subheader" actAsExpander={true}
                            showExpandableButton={true}
                />
                <CardMedia >
                    <video src="https://content.siselinternational.com/static-html/ipayout.mp4" controls>
                        <source src="https://content.siselinternational.com/static-html/ipayout.mp4"/>
                    </video>
                </CardMedia>
                <CardTitle title="Intrepid Before and After title" subtitle="Card subtitle"/>
                <CardText>This is an example of a media card</CardText>
                <FlatButton onClick={this.toggleExpand}
                            labelPosition="before"
                            icon={this.state.expanded ? <ExpandLess color={red500}/> : <ExpandMore color={red500}/> }>
                    {this.state.expanded ? "Hide details" : "Show details"}
                </FlatButton>
                <a href="https://content.siselinternational.com/static-html/ipayout.mp4" style={styles.downloadAnchor} download>
                    <FlatButton
                        labelPosition="before"
                        icon={<Download color={red500}/>} >Download</FlatButton>
                </a>
                <CardText style={styles.detailSection} expandable={true}>These are details about the card</CardText>
            </Card>
        )
    }
}