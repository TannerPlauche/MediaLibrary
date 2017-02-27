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
import Back from 'material-ui/svg-icons/navigation/arrow-back';

import {red900, red500} from 'material-ui/styles/colors'


const styles = {
    addMediaModal: [{
        width: '50%',
        height: 500,
        maxWidth: 'none',
        // maxHeight: 'none'
    },
        {
            width: '80%',
            height: 700,
            maxWidth: 'none',
            overflowX: 'scroll'
            // maxHeight: 'none'

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
    },
    formSection:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    formStyle: {
        margin: 10,
        minWidth: 40,
        width: 250
    }
};

@observer
export default class addMediaModal extends Component {

    state = {
        open: mediaStore.addMediaModalIsOpen,
        newMediaWizardIndex: 0,
        newItemForm: "",
        newMediaItem: {}
    };

    toggleOpenModal = () => {
        this.setState({newMediaWizardIndex: 0}, () => {
            console.log("loaded", this.state.newMediaWizardIndex);
        });
        this.props.toggleOpen();
    };

    incrementNewMediaIndex = (incrementAmount) => {
        console.log("increment amount", incrementAmount);
        let incrementedIndex = this.state.newMediaWizardIndex + incrementAmount;
        this.setState({newMediaWizardIndex: incrementedIndex});
        console.log(this.state.newMediaWizardIndex);
    };

    decrementNewMediaIndex = (decrementAmount) => {
        let decrementedIndex = this.state.newMediaWizardIndex - decrementAmount;
        decrementedIndex < 0 ? decrementedIndex = 0 : decrementedIndex;
        this.setState({newMediaWizardIndex: decrementedIndex}, ()=>{
            console.log(this.state.newMediaWizardIndex);});
    };

    componentWillReceiveProps(){
        // this.forceUpdate();
    }

    setNewMediaItemType = (property, type)=>{
        console.log(property, type);
        mediaStore.clearnewMediaItem();
        this.forceUpdate();
        mediaStore.setNewMediaItemProp(property, type);
        this.forceUpdate();

    };

    setNewMediaItemProp = (event)=>{
        console.log(event);
        let property = event.target.name;
        let value = event.target.value;
        console.log(property, value);
        mediaStore.setNewMediaItemProp(property, value);
        this.forceUpdate();
    };


    render(){
        let {newMediaItem}= this.props;
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.toggleOpenModal}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.toggleOpenModal}
            />,
        ];

// MEDIA FORMS
// MEDIA FORMS
// MEDIA FORMS
// MEDIA FORMS
// MEDIA FORMS
// MEDIA FORMS
// MEDIA FORMS
        const newMediaForms = {
            image: <div style={styles.formSection}>
                <label style={styles.formStyle} htmlFor="newImageUrl">URL <input className="form-control" type="text" onChange={this.setNewMediaItemProp} placeholder="New Image URL" name="url" value={mediaStore.newMediaItem.url} id="newImageUrl"/></label>
                <label style={styles.formStyle} htmlFor="newImageTitle">Title <input className="form-control" type="text" onChange={this.setNewMediaItemProp} placeholder="New Image Title" name="title" value={mediaStore.newMediaItem.title} id="newImageTitle"/></label>
                <label style={styles.formStyle} htmlFor="newImageDescription"> Description <textarea className="form-control" onChange={this.setNewMediaItemProp} placeholder="New Image description" type="text" name="description" value={mediaStore.newMediaItem.description} id="newImageDescription"/> </label>
                <label style={styles.formStyle} htmlFor="newImageFormat"> Format <select className="form-control" onChange={this.setNewMediaItemProp} placeholder="New Image format"type="text" name="format" value={mediaStore.newMediaItem.format} id="newImageFormat">
                    <option selected disabled>Select format</option>
                    <option value="png">PNG</option>
                    <option value="jpg">JPG</option>
                    <option value="svg">SVG</option>
                    <option value="ai">AI</option>
                    <option value="other">Other</option>
                </select> </label>
                <label style={styles.formStyle} htmlFor="newImageHeight"> Height <input className="form-control" onChange={this.setNewMediaItemProp} placeholder="New Image Height"  type="number" name="height" value={mediaStore.newMediaItem.height} id="newImageHeight"/> </label>
                <label style={styles.formStyle} htmlFor="newImageWidth"> Width <input className="form-control" onChange={this.setNewMediaItemProp} placeholder="New Image Width"  type="number" name="width" value={mediaStore.newMediaItem.width} id="newImageWidth"/> </label>
                <label style={styles.formStyle} htmlFor="newImageDesigner"> Designer <input className="form-control" onChange={this.setNewMediaItemProp} placeholder="New Image Designer"  type="text" name="designer" value={mediaStore.newMediaItem.designer} id="newImageDesigner"/> </label>
                <label style={styles.formStyle} htmlFor="newImageCampaign"> Campaign <input className="form-control" onChange={this.setNewMediaItemProp} placeholder="New Image Campaign"  type="text" name="campaign" value={mediaStore.newMediaItem.campaign} id="newImageCampaign"/> </label>
            </div>,
            video: <div style={styles.formSection}>
                <label style={styles.formStyle} htmlFor="newVideoUrl">URL <input className="form-control" type="text" onChange={this.setNewMediaItemProp} placeholder="New Video URL" name="url" value={mediaStore.newMediaItem.url} id="newVideoUrl"/></label>
                <label style={styles.formStyle} htmlFor="newVideoTitle">Title <input className="form-control" type="text" onChange={this.setNewMediaItemProp} placeholder="New Video Title" name="title" value={mediaStore.newMediaItem.title} id="newVideoTitle"/></label>
                <label style={styles.formStyle} htmlFor="newVideoDescription"> Description <textarea className="form-control" onChange={this.setNewMediaItemProp} placeholder="New Video description" type="text" name="description" value={mediaStore.newMediaItem.description} id="newVideoDescription"/> </label>
                <label style={styles.formStyle} htmlFor="newVideoFormat"> Format <select className="form-control" onChange={this.setNewMediaItemProp} placeholder="New Video format"type="text" name="format" value={mediaStore.newMediaItem.format} id="newVideoFormat">
                    <option selected disabled>Select format</option>
                    <option value="mp4">MP4</option>
                    <option value="AVI">AVI</option>
                    <option value="WMV">WMV</option>
                    <option value="MPEG">MPEG</option>
                    <option value="mov">MOV</option>
                    <option value="other">Other</option>
                </select> </label>
                <label style={styles.formStyle} htmlFor="newVideoHeight"> Height <input className="form-control" onChange={this.setNewMediaItemProp} placeholder="New Video Height"  type="number" name="height" value={mediaStore.newMediaItem.height} id="newVideoHeight"/> </label>
                <label style={styles.formStyle} htmlFor="newVideoWidth"> Width <input className="form-control" onChange={this.setNewMediaItemProp} placeholder="New Video Width"  type="number" name="width" value={mediaStore.newMediaItem.width} id="newVideoWidth"/> </label>
                <label style={styles.formStyle} htmlFor="newVideoLength"> Length <input className="form-control" onChange={this.setNewMediaItemProp} placeholder="New Video Length"  type="number" name="width" value={mediaStore.newMediaItem.width} id="newVideoLength"/> </label>
                <label style={styles.formStyle} htmlFor="newVideoLanguage"> Language <input className="form-control" onChange={this.setNewMediaItemProp} placeholder="New Video Language"  type="number" name="width" value={mediaStore.newMediaItem.width} id="newVideoLanguage"/> </label>
                <label style={styles.formStyle} htmlFor="newVideoDesigner"> Designer <input className="form-control" onChange={this.setNewMediaItemProp} placeholder="New Video Designer"  type="text" name="designer" value={mediaStore.newMediaItem.designer} id="newVideoDesigner"/> </label>
                <label style={styles.formStyle} htmlFor="newVideoCampaign"> Campaign <input className="form-control" onChange={this.setNewMediaItemProp} placeholder="New Video Campaign"  type="text" name="campaign" value={mediaStore.newMediaItem.campaign} id="newVideoCampaign"/> </label>
            </div>,


        };

// Templates that are rotated through to add media
// Templates that are rotated through to add media
// Templates that are rotated through to add media
// Templates that are rotated through to add media
        const addMediaWizardTemplates = [
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
            // Add New Media subsection
            // Add New Media subsection
            // Add New Media subsection
            // Add New Media subsection
            // Add New Media subsection
            <div>
                <h3 style={{textAlign: 'center'}}>Add new {mediaStore.newMediaItem.type}</h3>
                <br/>
                <h3>Type</h3>
                <label style={{margin: 10}} htmlFor="imageRadio"><input className="radio" name="type" checked={mediaStore.newMediaItem.type == "image"} onClick={()=>{this.setNewMediaItemType("type", "image")}} id="imageRadio" type="radio" value="image"/> Image</label>
                <label style={{margin: 10}} htmlFor="videoRadio"><input className="radio" name="type" checked={mediaStore.newMediaItem.type == "video"} onClick={()=>{this.setNewMediaItemType("type", "video")}} id="videoRadio" type="radio" value="video"/> Video</label>
                <label style={{margin: 10}} htmlFor="audioRadio"><input className="radio" name="type" checked={mediaStore.newMediaItem.type == "audio"} onClick={()=>{this.setNewMediaItemType("type", "audio")}} id="audioRadio" type="radio" value="audio"/> Audio</label>
                <label style={{margin: 10}} htmlFor="pdfRadio"><input className="radio" name="type" onClick={()=>{this.setNewMediaItemType("type", "pdf")}} id="pdfRadio" type="radio" value="pdf"/> PDF</label>
                <label style={{margin: 10}} htmlFor="pptRadio"><input className="radio" name="type" onClick={()=>{this.setNewMediaItemType("type", "ppt")}} id="pptRadio" type="radio" value="ppt"/> Presentation</label>
                <label style={{margin: 10}} htmlFor="otherRadio"><input className="radio" name="type" onClick={()=>{this.setNewMediaItemType("type", "other")}} id="otherRadio" type="radio" value="other"/> Other</label>
                {newMediaForms[mediaStore.newMediaItem.type]}
                <h5>{JSON.stringify(mediaStore.newMediaItem)}</h5>
            </div>,
            // Add New Campaign subsection
            // Add New Campaign subsection
            // Add New Campaign subsection
            // Add New Campaign subsection
            // Add New Campaign subsection
            <div>
                <h1>Add Campaign</h1>
            </div>];

        return (
            <Dialog
                title={
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <FlatButton style={{flex: 1, display: 'flex', justifyContent: 'start'}} onClick={()=>{this.decrementNewMediaIndex(1)}} icon={<Back/>}/>
                        <span style={{flex: 1, textAlign: 'center'}}>New Media Wizard</span>
                        <span style={{flex: 1}}></span>
                    </div>
                }
                titleStyle={{textAlign: 'center'}}
                actions={actions}
                modal={true}
                contentStyle={styles.addMediaModal[this.state.newMediaWizardIndex]}
                open={this.props.open}
            >

                {addMediaWizardTemplates[this.state.newMediaWizardIndex]}
            </Dialog>
        )
    }

}