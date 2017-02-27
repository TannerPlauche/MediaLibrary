import React, {Component}from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import {red900, red500} from 'material-ui/styles/colors'

const styles = {
    card: {
        // display: 'flex',
        // flex: 0.25,
        maxWidth: 300,
        margin: 10,
    },
    detailSection: {
        backgroundColor: "lightgray"
    }
};

/**
 * This component is designed to fit in a Bootstrap row.
 */
export default class otherMediaCard extends Component {

    constructor(props){
        super(props);
        this.state={
            expanded: false
        }
    }

    toggleExpand=()=>{
        let toggledExpand = !this.state.expanded;
        this.setState({expanded:toggledExpand});
    };

    render() {
        return (
            <Card className="col-xs-6 col-sm-4 col-lg-3" style={styles.card} expanded={this.state.expanded} onExpandChange={this.toggleExpand}>
                <CardHeader title="Test Card" subtitle="Test Subheader" actAsExpander={true}
                            showExpandableButton={true}
                />
                <CardMedia >
                    <img  src="http://www.siselbeauty.com/images/testimonialsPortrait1.jpeg" alt=""/>
                </CardMedia>
                <CardTitle title="Intrepid Before and After title" subtitle="Card subtitle"/>
                <CardText>This is an example of a media card</CardText>
                <FlatButton onClick={this.toggleExpand}
                            labelPosition="before"
                            icon={this.state.expanded ? <ExpandMore color={red500}/> :
                                <ExpandLess color={red500}/>}>{this.state.expanded ? "Show details" : "Hide details"}</FlatButton>
                <CardText style={styles.detailSection} expandable={true}>These are details about the card</CardText>
            </Card>
        )
    }
}