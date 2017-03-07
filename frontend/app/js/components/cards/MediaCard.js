import React, {Component}from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {WithContext as ReactTags} from 'react-tag-input';
import FlatButton from 'material-ui/FlatButton';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import Download from 'material-ui/svg-icons/file/file-download'
import TagAdder from '../menu/TagAdder';
import ImageIcon from 'material-ui/svg-icons/image/image';
import VideoIcon from 'material-ui/svg-icons/av/videocam';
import AudioIcon from 'material-ui/svg-icons/image/audiotrack';
import PDFIcon from 'material-ui/svg-icons/image/picture-as-pdf';
import PresentationIcon from 'material-ui/svg-icons/communication/screen-share';
import OtherIcon from 'material-ui/svg-icons/action/perm-media';

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
        backgroundColor: "lightgray",
        maxWidth: '100%'
    },
    downloadAnchor: {
        marginleft: 15
    }
};

/**
 * This component is designed to fit in a Bootstrap row.
 */
export default class MediaCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            tags: [{id: 1, text: "Apples"}],
            suggestions: ["Banana", "Mango", "Pear", "Apricot"]
        }
    }

    handleDelete = (i) => {
        let tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: tags});
    };
    handleAddition = (tag) => {
        let tags = this.state.tags;
        tags.push({
            id: tags.length + 1,
            text: tag
        });
        this.setState({tags: tags});
    };
    handleDrag = (tag, currPos, newPos) => {
        let tags = this.state.tags;

        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);

        // re-render
        this.setState({tags: tags});
    };

    toggleExpand = () => {
        let toggledExpand = !this.state.expanded;
        this.setState({expanded: toggledExpand});
    };

    setImageHeaderSubtitle = () => {
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


    setHeaderIcon = () => {
        switch (this.props.mediaRecord.type) {
            case "image":
                return <ImageIcon/>;
                break;
            case "video":
                return <VideoIcon/>;
                break;
            case "audio":
                return <AudioIcon/>;
                break;
            case "presentation":
                return <PresentationIcon/>;
                break;
            case "pdf":
                return <PDFIcon/>;
                break;
            case "other":
                return <OtherIcon/>;
                break;
            default:
                return "This media is not recognized";
                break;
        }
    };

    setCardMedia = () => {
        switch (this.props.mediaRecord.type) {
            case "image":
                return <img src={this.props.mediaRecord.url} alt="Sisel Media Image"/>
                break;
            case "video":
                return (
                    <video src={this.props.mediaRecord.url} controls alt="Sisel Media Video">
                        <source src={this.props.mediaRecord.url}/>
                    </video>);
                break;
            case "audio":
                return (
                    <audio controls alt="Sisel Media Audio">
                        <source src={this.props.mediaRecord.url} type="audio/ogg"/>
                    </audio>
                );
                break;
            case "presentation":
                return <iframe src={this.props.mediaRecord.url} alt="Sisel Media Presentation"/>;
                break;
            case "pdf":
                return <iframe src={this.props.mediaRecord.url} alt="Sisel Media PDF"/>;
                break;
            case "other":
                return <iframe src={this.props.mediaRecord.url}/>;
                break;
            default:
                return "This media is not recognized";
                break;
        }
    };

    render() {
        let customizeable = this.setImageHeaderSubtitle();
        console.log(this.props);
        return (
            <Card style={styles.card} expanded={this.state.expanded} onExpandChange={this.toggleExpand}>
                <CardHeader avatar={this.setHeaderIcon()}
                            subtitle={<div>
                                {customizeable}
                            </div>} actAsExpander={true}
                            showExpandableButton={true}
                />
                <CardMedia >
                    {this.setCardMedia()}
                </CardMedia>
                <CardTitle title={this.props.mediaRecord.title} subtitle={this.props.mediaRecord.description}/>
                <CardText>{this.props.mediaRecord.description}</CardText>
                <FlatButton onClick={this.toggleExpand}
                            labelPosition="before"
                            icon={this.state.expanded ? <ExpandLess color={red500}/> : <ExpandMore color={red500}/> }>
                    {this.state.expanded ? "Hide details" : "Show details"}
                </FlatButton>
                <a href="http://www.siselbeauty.com/images/testimonialsPortrait1.jpeg" style={styles.downloadAnchor}
                   download>
                    <FlatButton
                        labelPosition="before"
                        icon={<Download color={red500}/>}>Download</FlatButton>
                </a>
                <CardText style={styles.detailSection} expandable={true}>
                    <div>
                        <div>
                            Tags:
                            <ReactTags tags={this.props.mediaRecord.tags}
                                       suggestions={this.state.suggestions}
                                       handleDelete={this.handleDelete}
                                       handleAddition={this.handleAddition}
                                       handleDrag={this.handleDrag}
                                       allowDeleteFromEmptyInput={false}
                                       placeholder="Add New Tag"
                                       minQueryLength={1}
                                       readOnly={true}
                            />
                        </div>
                    </div>
                </CardText>
            </Card>
        )
    }
}