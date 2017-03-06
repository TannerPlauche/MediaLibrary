import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {WithContext as ReactTags} from 'react-tag-input';
import mediaStore from "../../../stores/mediaStore";
import {red500} from 'material-ui/styles/colors'

// Expects prop type: "mediaItem" or "campaign"

@observer
export default class TagAdder extends Component{

    handleTagDelete = (i) => {

        if(this.props.type==="mediaItem") {
            mediaStore.handleNewItemTagDelete(i);
        }
        else if(this.props.type=="campaign"){
            mediaStore.handleNewCampaignTagDelete(i);
        } else {
            console.warn("Unacceptable proptype 'type' in TagAdder component")
        }

    };

    handleTagAddition = (tag) => {
        if(this.props.type==="mediaItem") {
            mediaStore.handleNewItemTagAddition(tag);
        }
        else if(this.props.type=="campaign"){
            mediaStore.handleNewCampaignTagAddition(tag);
        } else {
            console.warn("Unacceptable proptype 'type' in TagAdder component")
        }

    };

    handleTagDrag = (tag, currPos, newPos) => {
        if(this.props.type==="mediaItem") {
            mediaStore.handleNewItemTagDrag(tag, currPos, newPos);
        }
        else if(this.props.type=="campaign"){
            mediaStore.handleNewCampaignTagDrag(tag, currPos, newPos);
        } else {
            console.warn("Unacceptable proptype 'type' in TagAdder component")
        }

    };

    handleNewCampaignTagDelete = (i) => {
        mediaStore.handleNewCampaignTagDelete(i);
    };

    handleNewCampaignTagAddition = (tag) => {
        mediaStore.handleNewCampaignTagAddition(tag);
    };

    handleNewCampaignTagDrag = (tag, currPos, newPos) => {
        mediaStore.handleNewCampaignTagDrag(tag, currPos, newPos);
    };

    render(){
        return (
            <div>
                <h6 style={{color: red500}}>Tags</h6>
                {mediaStore.newMediaItem.tags.length ? "" : <h6 style={{color: red500}}>No Tags yet!</h6>}
                <ReactTags tags={mediaStore.newMediaItem.tags}
                           suggestions={mediaStore.tagSuggestions}
                           handleDelete={this.handleTagDelete}
                           handleAddition={this.handleTagAddition}
                           handleDrag={this.handleTagDrag}
                           allowDeleteFromEmptyInput={false}
                           placeholder="Add New Tag"
                           minQueryLength={1}
                           readOnly={this.props.readOnly}
                />
            </div>
        )
    }
}
