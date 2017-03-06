import React, {Component}from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import Download from 'material-ui/svg-icons/file/file-download'
import Video from 'material-ui/svg-icons/av/videocam';
import CheckedCircle from 'material-ui/svg-icons/action/check-circle';
import UncheckedCircle from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import {red900, red500, red300, green500} from 'material-ui/styles/colors'

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

    getImageHeaderSubtitle = () => {
        let subtitle;
        let customizable;
        let downloadable;
        customizable = this.props.mediaRecord.customizable ?
            <CheckedCircle color={green500}/> :
            <UncheckedCircle color={red300}/>;
        downloadable = this.props.mediaRecord.downloadable ?
            <CheckedCircle color={green500}/> :
            <UncheckedCircle color={red300}/>;
        subtitle = <div>
            {customizable} <span>Customizable</span>  {downloadable} <span>Downloadable</span>
        </div>;
        return subtitle;
    };

    render() {
        let customizeable = this.getImageHeaderSubtitle();

        return (
            <Card style={styles.card} expanded={this.state.expanded} onExpandChange={this.toggleExpand}>
                <CardHeader avatar={<Video/>}  subtitle={<div>
                    {customizeable}
                </div>} actAsExpander={true}
                            showExpandableButton={true}
                />
                <CardMedia >
                    <video src={this.props.mediaRecord.url} controls>
                        <source src={this.props.mediaRecord.url}/>
                    </video>
                </CardMedia>
                <CardTitle title={this.props.mediaRecord.title} subtitle={this.props.mediaRecord.description}/>
                <CardText>{this.props.mediaRecord.description}</CardText>
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