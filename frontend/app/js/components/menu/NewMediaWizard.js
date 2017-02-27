import React, {Component} from 'react';
import {observer} from 'mobx-react';
import mediaStore from "../../../stores/mediaStore";
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import Search from 'material-ui/svg-icons/action/search';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import Add from 'material-ui/svg-icons/content/add';

import {red900, red500} from 'material-ui/styles/colors'

const styles = {
    addMediaModal: [{
        width: '50%',
        maxWidth: 'none',
    },
        {
            width: '80%',
            maxWidth: 'none',
        }],
    buttonStyle: {
        height: 40,
        fontSize: 25,
        // margin: 10

    },
    buttonLabelStyle: {
        color: '#fff',
        textTransform: 'none',
        fontSize: 25,
        minWidth: 50,
    }
};

@observer
export default class NewMediaWizard extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return true;
    }

    setNewMediaItemProp = (property, value) =>{
        this.props.setNewMediaItemProp(property, value);
        this.forceUpdate();
        console.log("ms", mediaStore.newMediaItem);

    };

    incrementNewMediaIndex = (incrementAmount) => {
        console.log("increment amount", incrementAmount);
        mediaStore.incrementnewMediaWizardIndex(incrementAmount);
        console.log(mediaStore.newMediaWizardIndex);
    };

    decrementNewMediaIndex = (decrementAmount) => {
        mediaStore.decrementnewMediaWizardIndex(decrementAmount);
        console.log(mediaStore.newMediaWizardIndex);
    };

    newMediaForms = {
        video: <div>
            <label htmlFor="newImageTitle"> Title <input type="text" id="newImageTitle"/></label>
            <label htmlFor="newImageDescription"> Description <input type="text" id="newImageDescription"/> </label>
        </div>,
        image: <div>Image Form</div>,

    };

    // Templates that are rotated through to add media
    addMediaWizardTemplates = [
        //Initial wizard template. Select to add media or campaign.
        <div style={{display: "flex", justifyContent: "space-around", flexWrap: 'wrap'}}>
            <RaisedButton label="Add Media"
                          labelPosition="before"
                          labelStyle={styles.buttonLabelStyle}
                          onClick={() => {
                              this.incrementNewMediaIndex(1)
                          }}
                          value={1}
                          backgroundColor={red500}
                          buttonStyle={styles.buttonStyle}
                          style={{margin: 10}}
                          icon={<NoteAdd />}/>
            <RaisedButton label="Create Campaign"
                          labelPosition="before"
                          labelStyle={styles.buttonLabelStyle}
                          onClick={() => {
                              this.incrementNewMediaIndex(2)
                          }}
                          value={2}
                          backgroundColor={red500}
                          buttonStyle={styles.buttonStyle}
                          style={{margin: 10}}
                          icon={<Add />}/>

        </div>,
        // Add New Media
        // Add New Media
        // Add New Media
        // Add New Media
        // Add New Media
        <div>
            <h3 style={{textAlign: 'center'}}>Add new media</h3>
            <br/>
            <h3>Type</h3>
            <label style={{margin: 10}} htmlFor="imageRadio"><input name="mediaType" onClick={()=>{this.setNewMediaItemProp("type", "image")}} id="imageRadio" type="radio" value="image"/> Image</label>
            <label style={{margin: 10}} htmlFor="videoRadio"><input name="mediaType" onClick={()=>{this.setNewMediaItemProp("type", "video")}} id="videoRadio" type="radio" value="video"/> Video</label>
            <label style={{margin: 10}} htmlFor="audioRadio"><input name="mediaType" onClick={()=>{this.setNewMediaItemProp("type", "audio")}} id="audioRadio" type="radio" value="audio"/> Audio</label>
            <label style={{margin: 10}} htmlFor="pdfRadio"><input name="mediaType" onClick={()=>{this.setNewMediaItemProp("type", "pdf")}} id="pdfRadio" type="radio" value="pdf"/> PDF</label>
            <label style={{margin: 10}} htmlFor="pptRadio"><input name="mediaType" onClick={()=>{this.setNewMediaItemProp("type", "ppt")}} id="pptRadio" type="radio" value="ppt"/> Presentation</label>
            <label style={{margin: 10}} htmlFor="otherRadio"><input name="mediaType" onClick={()=>{this.setNewMediaItemProp("type", "other")}} id="otherRadio" type="radio" value="other"/> Other</label>
            {this.newMediaForms[mediaStore.newMediaItem.type]}
            <h5>{JSON.stringify(mediaStore.newMediaItem)}</h5>
        </div>,
        // Add New Campaign
        // Add New Campaign
        // Add New Campaign
        // Add New Campaign
        // Add New Campaign
        <div>
            <h1>Add Campaign</h1>
        </div>];

    render() {
        return (
            <div>
                {this.addMediaWizardTemplates[mediaStore.newMediaWizardIndex]}
            </div>
        )
    }
}