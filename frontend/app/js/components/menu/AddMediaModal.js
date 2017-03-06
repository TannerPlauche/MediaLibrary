import React, {Component} from 'react';
import {observer} from 'mobx-react';
import mediaStore from "../../../stores/mediaStore";
import CampaignSelector from "./CampaignSelector";
import TagAdder from "./TagAdder";
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import Add from 'material-ui/svg-icons/content/add';
import Back from 'material-ui/svg-icons/navigation/arrow-back';

import {red500} from 'material-ui/styles/colors'

const styles = {
    addMediaModal: [{
        width: '50%',
        // height: 500,
        maxWidth: 'none',
        // overflowX: 'scroll'
        // maxHeight: 'none'
    },
        {
            width: '80%',
            height: 700,
            maxWidth: 'none',
            // overflowX: 'scroll',
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
    formSection: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        overflowX: 'scroll'
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
        newMediaWizardIndex: mediaStore.newMediaWizardIndex,
        newItemForm: "",
        newMediaItem: {},
        selectValue: "Select format"
    };

    componentWillMount() {
        mediaStore.getCampaigns();
    }

    toggleOpenModal = () => {
        this.setState({newMediaWizardIndex: 0}, () => {
            console.log("loaded", this.state.newMediaWizardIndex);
        });
        this.props.toggleOpen();
    };

    incrementNewMediaIndex = (incrementAmount) => {
        // console.log("increment amount", incrementAmount);
        // let incrementedIndex = this.state.newMediaWizardIndex + incrementAmount;
        // this.setState({newMediaWizardIndex: incrementedIndex});
        // console.log(this.state.newMediaWizardIndex);
        mediaStore.incrementnewMediaWizardIndex(incrementAmount);
        console.log(mediaStore.newMediaWizardIndex);
        // this.forceUpdate();
    };

    decrementNewMediaIndex = (decrementAmount) => {
        // let decrementedIndex = this.state.newMediaWizardIndex - decrementAmount;
        // decrementedIndex < 0 ? decrementedIndex = 0 : decrementedIndex;
        // this.setState({newMediaWizardIndex: decrementedIndex}, () => {
        //     console.log(this.state.newMediaWizardIndex);
        // });
        mediaStore.decrementnewMediaWizardIndex(decrementAmount);
        console.log(mediaStore.newMediaWizardIndex);
        // this.forceUpdate();
    };


    componentWillReceiveProps() {
        // this.forceUpdate();
    }

    setNewMediaItemType = (property, type) => {
        console.log(property, type);
        mediaStore.clearNewMediaItem();
        // this.forceUpdate();
        mediaStore.setNewMediaItemProp(property, type);
        // this.forceUpdate();

    };

    setNewMediaItemProp = (event) => {
        let property = event.target.name;
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        console.log(property, value);
        mediaStore.setNewMediaItemProp(property, value);
        // this.forceUpdate();
    };

    setnewMediaCampaignProp = (event, date) => {
        let property;
        let value;
        console.log(event, date);
        if (!date) {
            property = event.target.name;
            value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        } else {
            property = 'dateReleased';
            value = date;
        }
        console.log(property, value);
        mediaStore.setNewMediaCampaignProp(property, value);
        // this.forceUpdate();
    };

    submitNewMediaItem = () => {
        mediaStore.submitNewMediaItem();
    };

    render() {
        let {newMediaItem}= this.props;

// ACTIONS
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.toggleOpenModal}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.submitNewMediaItem}
            />,
        ];

// MEDIA FORMS
        const newMediaForms = {
                image: <div>
                    <h4 style={{color: red500}}>New Image Properties</h4>
                    <div style={{display: 'inline-flex'}}>
                        <label className="checkboxLabel"
                               style={{margin: 10}} htmlFor="newImageCustomizable">
                            <input className="checkboxInput"
                                   id="newImageCustomizable" name="customizable"
                                   type="checkbox"
                                   onChange={this.setNewMediaItemProp}/> Customizable
                        </label>
                        <label className="checkboxLabel" style={{margin: 10}} htmlFor="newImageDownloadable">
                            <input className="checkboxInput"
                                   id="newImageDownloadable" name="downloadable"
                                   type="checkbox"
                                   onChange={this.setNewMediaItemProp}/> Downloadable
                        </label>
                    </div>
                    <div style={styles.formSection}>
                        <label style={styles.formStyle} htmlFor="newImageUrl">URL
                            <input className="form-control" type="text"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Image URL" name="url"
                                   id="newImageUrl"/>
                        </label>
                        {mediaStore.newMediaItem.url &&
                        <img style={{maxWidth: 150}} src={mediaStore.newMediaItem.url} alt=""/>}
                        <label style={styles.formStyle} htmlFor="newImageTitle">Title
                            <input className="form-control"
                                   type="text"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Image Title"
                                   name="title"
                                   id="newImageTitle"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newImageDescription"> Description
                            <textarea
                                className="form-control" onChange={this.setNewMediaItemProp}
                                placeholder="New Image description"
                                type="text" name="description"
                                id="newImageDescription"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newImageFormat"> Format
                            <select className="form-control"
                                    onChange={this.setNewMediaItemProp}
                                    value={this.state.selectValue}
                                    type="text"
                                    name="format"
                                    id="newImageFormat">
                                <option value="Select format" disabled>Select format</option>
                                <option value="png">PNG</option>
                                <option value="jpg">JPG</option>
                                <option value="svg">SVG</option>
                                <option value="ai">AI</option>
                                <option value="other">Other</option>
                            </select></label>
                        <label style={styles.formStyle} htmlFor="newImageHeight"> Height
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Image Height"
                                   type="number" name="height"
                                   id="newImageHeight"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newImageWidth"> Width
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Image Width"
                                   type="number" name="width"
                                   id="newImageWidth"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newImageDesigner"> Designer
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Image Designer"
                                   type="text" name="designer"
                                   id="newImageDesigner"/>
                        </label>
                        {/*<label style={styles.formStyle} htmlFor="newImageCampaign"> Campaign*/}
                        {/*<input className="form-control"*/}
                        {/*onChange={this.setNewMediaItemProp}*/}
                        {/*placeholder="New Image Campaign"*/}
                        {/*type="text" name="campaign"*/}

                        {/*id="newImageCampaign"/>*/}
                        {/*</label>*/}
                        {/*<label htmlFor="campaignSelector"> Campaigns*/}
                        <CampaignSelector id="campaignSelector"/>
                        {/*</label>*/}
                        {/*<div>*/}
                        {/*<ImageMediaCard/>*/}
                        {/*</div>*/}
                    </div>
                    <TagAdder type="mediaItem"/>
                </div>,
                video: <div>
                    <h4 style={{color: red500}}>New Image Properties</h4>
                    <div style={{display: 'inline-flex'}}>
                        <label className="checkboxLabel"
                               style={{margin: 10}} htmlFor="newImageCustomizable">
                            <input className="checkboxInput"
                                   id="newImageCustomizable" name="customizable"
                                   type="checkbox"
                                   onChange={this.setNewMediaItemProp}/> Customizable
                        </label>
                        <label className="checkboxLabel" style={{margin: 10}} htmlFor="newImageDownloadable">
                            <input className="checkboxInput"
                                   id="newImageDownloadable" name="downloadable"
                                   type="checkbox"
                                   onChange={this.setNewMediaItemProp}/> Downloadable
                        </label>
                    </div>
                    <div style={styles.formSection}>
                        <label style={styles.formStyle} htmlFor="newVideoUrl">URL
                            <input className="form-control" type="text"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Video URL" name="url" id="newVideoUrl"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newVideoTitle">Title
                            <input className="form-control"
                                   type="text"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Video Title"
                                   name="title" id="newVideoTitle"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newVideoDescription"> Description
                            <textarea
                                className="form-control" onChange={this.setNewMediaItemProp}
                                placeholder="New Video description"
                                type="text" name="description" id="newVideoDescription"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newVideoFormat"> Format
                            <select className="form-control"
                                    value={this.state.selectValue}
                                    onChange={this.setNewMediaItemProp}
                                    placeholder="New Video format"
                                    type="text" name="format" id="newVideoFormat">
                                <option value="Select format" disabled>Select format</option>
                                <option value="mp4">MP4</option>
                                <option value="AVI">AVI</option>
                                <option value="WMV">WMV</option>
                                <option value="MPEG">MPEG</option>
                                <option value="mov">MOV</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                        <label style={styles.formStyle} htmlFor="newVideoHeight"> Height
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Video Height"
                                   type="number" name="height" id="newVideoHeight"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newVideoWidth"> Width
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Video Width"
                                   type="number" name="width" id="newVideoWidth"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newVideoLength"> Length (mins)
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Video Length"
                                   type="number" name="width" id="newVideoLength"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newVideoLanguage"> Language
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Video Language"
                                   type="text" name="width" id="newVideoLanguage"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newVideoDesigner"> Designer
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Video Designer"
                                   type="text" name="designer" id="newVideoDesigner"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newVideoCampaign"> Campaign
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Video Campaign"
                                   type="text" name="campaign" id="newVideoCampaign"/>
                        </label>
                        <label for="campaignSelector"> Campaigns
                            <CampaignSelector id="campaignSelector"/>
                        </label>
                    </div>
                    <TagAdder type="mediaItem"/>
                </div>,
                audio: <div>
                    <div style={styles.formSection}>
                        <h4 style={{color: red500}}>New Image Properties</h4>
                        <div style={{display: 'inline-flex'}}>
                            <label className="checkboxLabel"
                                   style={{margin: 10}} htmlFor="newImageCustomizable">
                                <input className="checkboxInput"
                                       id="newImageCustomizable" name="customizable"
                                       type="checkbox"
                                       onChange={this.setNewMediaItemProp}/> Customizable
                            </label>
                            <label className="checkboxLabel" style={{margin: 10}} htmlFor="newImageDownloadable">
                                <input className="checkboxInput"
                                       id="newImageDownloadable" name="downloadable"
                                       type="checkbox"
                                       onChange={this.setNewMediaItemProp}/> Downloadable
                            </label>
                        </div>
                        <label style={styles.formStyle} htmlFor="newAudioUrl">URL
                            <input className="form-control" type="text"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Audio URL" name="url" id="newAudioUrl"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newAudioTitle">Title
                            <input className="form-control"
                                   type="text"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Audio Title"
                                   name="title" id="newAudioTitle"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newAudioDescription"> Description
                            <textarea
                                className="form-control" onChange={this.setNewMediaItemProp}
                                placeholder="New Audio description"
                                type="text" name="description" id="newAudioDescription"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newAudioFormat"> Format
                            <select className="form-control"
                                    value={this.state.selectValue}
                                    onChange={this.setNewMediaItemProp}
                                    placeholder="New Audio format"
                                    type="text" name="format" id="newAudioFormat">
                                <option value="Select format" disabled>Select format</option>
                                <option value="mp3">MP3</option>
                                <option value="wav">WAV</option>
                                <option value="vox">VOX</option>
                                <option value="wma">WMA</option>
                                <option value="ogg">OGG</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                        {/*<label style={styles.formStyle} htmlFor="newAudioHeight"> Height*/}
                        {/*<input className="form-control"*/}
                        {/*onChange={this.setNewMediaItemProp}*/}
                        {/*placeholder="New Audio Height"*/}
                        {/*type="number" name="height"*/}

                        {/*id="newAudioHeight"/>*/}
                        {/*</label>*/}
                        {/*<label style={styles.formStyle} htmlFor="newAudioWidth"> Width*/}
                        {/*<input className="form-control"*/}
                        {/*onChange={this.setNewMediaItemProp}*/}
                        {/*placeholder="New Audio Width"*/}
                        {/*type="number" name="width"*/}

                        {/*id="newAudioWidth"/>*/}
                        {/*</label>*/}
                        <label style={styles.formStyle} htmlFor="newAudioLength"> Length
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Audio Length"
                                   type="number" name="width" id="newAudioLength"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newAudioLanguage"> Language
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Audio Language"
                                   type="text" name="width" id="newAudioLanguage"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newAudioDesigner"> Creator
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Audio Creator"
                                   type="text" name="creator" id="newAudioCreator"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newAudioCampaign"> Campaign
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Audio Campaign"
                                   type="text" name="campaign" id="newAudioCampaign"/>
                        </label>
                        <label for="campaignSelector"> Campaigns
                            <CampaignSelector id="campaignSelector"/>
                        </label>
                    </div>
                    <TagAdder type="mediaItem"/>
                </div>,
                pdf: <div>
                    <h4 style={{color: red500}}>New Image Properties</h4>
                    <div style={{display: 'inline-flex'}}>
                        <label className="checkboxLabel"
                               style={{margin: 10}} htmlFor="newImageCustomizable">
                            <input className="checkboxInput"
                                   id="newImageCustomizable" name="customizable"
                                   type="checkbox"
                                   onChange={this.setNewMediaItemProp}/> Customizable
                        </label>
                        <label className="checkboxLabel" style={{margin: 10}} htmlFor="newImageDownloadable">
                            <input className="checkboxInput"
                                   id="newImageDownloadable" name="downloadable"
                                   type="checkbox"
                                   onChange={this.setNewMediaItemProp}/> Downloadable
                        </label>
                    </div>
                    <div style={styles.formSection}>
                        <label style={styles.formStyle} htmlFor="newPDFUrl">URL
                            <input className="form-control" type="text"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New PDF URL" name="url" id="newPDFUrl"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newPDFTitle">Title
                            <input className="form-control"
                                   type="text"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New PDF Title"
                                   name="title" id="newPDFTitle"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newPDFDescription"> Description
                            <textarea
                                className="form-control" onChange={this.setNewMediaItemProp}
                                placeholder="New PDF description"
                                type="text" name="description" id="newPDFDescription"/>
                        </label>
                        {/*<label style={styles.formStyle} htmlFor="newPDFFormat"> Format*/}
                        {/*<select className="form-control"*/}
                        {/*onChange={this.setNewMediaItemProp}*/}
                        {/*placeholder="New PDF format"*/}
                        value{this.state.selectValue}
                        {/*type="text" name="format"*/}

                        {/*id="newPDFFormat">*/}
                        {/*<option value=Select format disabled>Select format</option>*/}
                        {/*<option value="mp4">MP4</option>*/}
                        {/*<option value="AVI">AVI</option>*/}
                        {/*<option value="WMV">WMV</option>*/}
                        {/*<option value="MPEG">MPEG</option>*/}
                        {/*<option value="mov">MOV</option>*/}
                        {/*<option value="other">Other</option>*/}
                        {/*</select>*/}
                        {/*</label>*/}
                        <label style={styles.formStyle} htmlFor="newPDFHeight"> Height
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New PDF Height"
                                   type="number" name="height" id="newPDFHeight"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newPDFWidth"> Width
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New PDF Width"
                                   type="number" name="width" id="newPDFWidth"/>
                        </label>
                        {/*<label style={styles.formStyle} htmlFor="newPDFLength"> Length*/}
                        {/*<input className="form-control"*/}
                        {/*onChange={this.setNewMediaItemProp}*/}
                        {/*placeholder="New PDF Length"*/}
                        {/*type="number" name="width"*/}

                        {/*id="newPDFLength"/>*/}
                        {/*</label>*/}
                        <label style={styles.formStyle} htmlFor="newPDFLanguage"> Language
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New PDF Language"
                                   type="text" name="width" id="newPDFLanguage"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newPDFDesigner"> Designer
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New PDF Designer"
                                   type="text" name="designer" id="newPDFDesigner"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newPDFCampaign"> Campaign
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New PDF Campaign"
                                   type="text" name="campaign" id="newPDFCampaign"/>
                        </label>
                        <label for="campaignSelector"> Campaigns
                            <CampaignSelector id="campaignSelector"/>
                        </label>
                    </div>
                    <TagAdder type="mediaItem"/>
                </div>,
                presentation: <div>
                    <h4 style={{color: red500}}>New Image Properties</h4>
                    <div style={{display: 'inline-flex'}}>
                        <label className="checkboxLabel"
                               style={{margin: 10}} htmlFor="newImageCustomizable">
                            <input className="checkboxInput"
                                   id="newImageCustomizable" name="customizable"
                                   type="checkbox"
                                   onChange={this.setNewMediaItemProp}/> Customizable
                        </label>
                        <label className="checkboxLabel" style={{margin: 10}} htmlFor="newImageDownloadable">
                            <input className="checkboxInput"
                                   id="newImageDownloadable" name="downloadable"
                                   type="checkbox"
                                   onChange={this.setNewMediaItemProp}/> Downloadable
                        </label>
                    </div>
                    <div style={styles.formSection}>
                        <label style={styles.formStyle} htmlFor="newPresentationUrl">URL
                            <input className="form-control" type="text"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Presentation URL" name="url" id="newPresentationUrl"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newPresentationTitle">Title
                            <input className="form-control"
                                   type="text"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Presentation Title"
                                   name="title" id="newPresentationTitle"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newPresentationDescription"> Description
                            <textarea
                                className="form-control" onChange={this.setNewMediaItemProp}
                                placeholder="New Presentation description"
                                type="text" name="description" id="newPresentationDescription"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newPresentationFormat"> Format
                            <select className="form-control"
                                    value={this.state.selectValue}
                                    onChange={this.setNewMediaItemProp}
                                    placeholder="New Presentation format"
                                    type="text" name="format" id="newPresentationFormat">
                                <option value="Select format" disabled>Select format</option>
                                <option value="ppt">PPT</option>
                                {/*<option value="AVI">AVI</option>*/}
                                {/*<option value="WMV">WMV</option>*/}
                                {/*<option value="MPEG">MPEG</option>*/}
                                {/*<option value="mov">MOV</option>*/}
                                <option value="other">Other</option>
                            </select>
                        </label>
                        <label style={styles.formStyle} htmlFor="newPresentationHeight"> Height
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Presentation Height"
                                   type="number" name="height" id="newPresentationHeight"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newPresentationWidth"> Width
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Presentation Width"
                                   type="number" name="width" id="newPresentationWidth"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newPresentationLength"> Slides
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="Slide Count"
                                   type="number" name="slides" id="newPresentationLength"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newPresentationLanguage"> Language
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Presentation Language"
                                   type="text" name="width" id="newPresentationLanguage"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newPresentationDesigner"> Designer
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Presentation Designer"
                                   type="text" name="designer" id="newPresentationDesigner"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newPresentationCampaign"> Campaign
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Presentation Campaign"
                                   type="text" name="campaign" id="newPresentationCampaign"/>
                        </label>
                        <label for="campaignSelector"> Campaigns
                            <CampaignSelector id="campaignSelector"/>
                        </label>
                    </div>
                    <TagAdder type="mediaItem"/>
                </div>,
                other: <div>
                    <h4 style={{color: red500}}>New Image Properties</h4>
                    <div style={{display: 'inline-flex'}}>
                        <label className="checkboxLabel"
                               style={{margin: 10}} htmlFor="newImageCustomizable">
                            <input className="checkboxInput"
                                   id="newImageCustomizable" name="customizable"
                                   type="checkbox"
                                   onChange={this.setNewMediaItemProp}/> Customizable
                        </label>
                        <label className="checkboxLabel" style={{margin: 10}} htmlFor="newImageDownloadable">
                            <input className="checkboxInput"
                                   id="newImageDownloadable" name="downloadable"
                                   type="checkbox"
                                   onChange={this.setNewMediaItemProp}/> Downloadable
                        </label>
                    </div>
                    <div style={styles.formSection}>
                        <label style={styles.formStyle} htmlFor="newOtherUrl">URL
                            <input className="form-control" type="text"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Other URL" name="url" id="newOtherUrl"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newOtherUrl">Other Type
                            <input className="form-control" type="text"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="Type" name="otherType" id="newOtherUrl"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newOtherTitle">Title
                            <input className="form-control"
                                   type="text"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Other Title"
                                   name="title" id="newOtherTitle"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newOtherDescription"> Description
                            <textarea
                                className="form-control" onChange={this.setNewMediaItemProp}
                                placeholder="New Other description"
                                type="text" name="description" id="newOtherDescription"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newOtherFormat"> Format
                            <select className="form-control"
                                    value={this.state.selectValue}
                                    onChange={this.setNewMediaItemProp}
                                    placeholder="New Other format"
                                    type="text" name="format" id="newOtherFormat">
                                <option value="Select format" disabled>Select format</option>
                                <option value="ppt">PPT</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                        <label style={styles.formStyle} htmlFor="newOtherHeight"> Height
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Other Height"
                                   type="number" name="height" id="newOtherHeight"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newOtherWidth"> Width
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Other Width"
                                   type="number" name="width" id="newOtherWidth"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newOtherLength"> Length
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="Slide Count"
                                   type="number" name="length" id="newOtherLength"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newOtherLanguage"> Language
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Other Language"
                                   type="text" name="width" id="newOtherLanguage"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newOtherDesigner"> Designer
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Other Designer"
                                   type="text" name="designer" id="newOtherDesigner"/>
                        </label>
                        <label style={styles.formStyle} htmlFor="newOtherCampaign"> Campaign
                            <input className="form-control"
                                   onChange={this.setNewMediaItemProp}
                                   placeholder="New Other Campaign"
                                   type="text" name="campaign" id="newOtherCampaign"/>
                        </label>
                        <label for="campaignSelector"> Campaigns
                            <CampaignSelector id="campaignSelector"/>
                        </label>
                    </div>
                    <TagAdder type="mediaItem"/>
                </div>
            }
            ;

// TEMPLATES THAT ARE ROTATED THROUGH TO ADD MEDIA
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
            <div style={{maxHeight: 500, overflowX: 'scroll'}}>
                <h3 style={{textAlign: 'center'}}>Add new {mediaStore.newMediaItem.type}</h3>
                <br/>
                <h3 style={{color: red500}}>Type</h3>

                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <label style={{margin: 10}} htmlFor="imageRadio">
                        <input className="radio" name="type"
                               checked={mediaStore.newMediaItem.type == "image"}
                               onClick={() => {
                                   this.setNewMediaItemType("type", "image")
                               }} id="imageRadio" type="radio" value="image"/> Image
                    </label>
                    <label style={{margin: 10}} htmlFor="videoRadio">
                        <input className="radio" name="type"
                               checked={mediaStore.newMediaItem.type == "video"}
                               onClick={() => {
                                   this.setNewMediaItemType("type", "video")
                               }} id="videoRadio" type="radio" value="video"/> Video
                    </label>
                    <label style={{margin: 10}} htmlFor="audioRadio">
                        <input className="radio" name="type"
                               checked={mediaStore.newMediaItem.type == "audio"}
                               onClick={() => {
                                   this.setNewMediaItemType("type", "audio")
                               }} id="audioRadio" type="radio" value="audio"/> Audio
                    </label>
                    <label style={{margin: 10}} htmlFor="pdfRadio">
                        <input className="radio" name="type" onClick={() => {
                            this.setNewMediaItemType("type", "pdf")
                        }}
                               id="pdfRadio" type="radio" value="pdf"/> PDF
                    </label>
                    <label style={{margin: 10}} htmlFor="pptRadio">
                        <input className="radio" name="type" onClick={() => {
                            this.setNewMediaItemType("type", "presentation")
                        }} id="pptRadio" type="radio" value="ppt"/> Presentation
                    </label>
                    <label style={{margin: 10}} htmlFor="otherRadio">
                        <input className="radio" name="type" onClick={() => {
                            this.setNewMediaItemType("type", "other")
                        }} id="otherRadio"
                               type="radio"
                               value="other"/> Other
                    </label>
                </div>

                {newMediaForms[mediaStore.newMediaItem.type]}
                <h5>{JSON.stringify(mediaStore.newMediaItem)}</h5>
            </div>
            ,
            // Add New Campaign subsection
            // Add New Campaign subsection
            // Add New Campaign subsection
            // Add New Campaign subsection
            // Add New Campaign subsection
            <div>
                <h1>Add Campaign</h1>
                <div style={styles.formSection}>

                    <label style={styles.formStyle} htmlFor="newCampaignTitle"> Title
                        <input className="form-control"
                               type="text"
                               onChange={this.setnewMediaCampaignProp}
                               placeholder="New Campaign Title"
                               name="title" id="newCampaignTitle"/>
                    </label>
                    <label style={styles.formStyle} htmlFor="newCampaignDateReleased"> Date Released
                        {/*<input className="form-control" type="date"*/}
                        {/*onChange={this.setNewMediaItemProp}*/}
                        {/*placeholder="New Presentation URL" name="dateReleased"*/}
                        {/*id="newCampaignDateReleased"/>*/}
                        <DatePicker hintText="New Campaign Use Date"
                                    mode="landscape"
                                    onChange={(undefined, date) => {
                                        this.setnewMediaCampaignProp({target: "date"}, date)
                                    }}
                                    formatDate={() => "" + (mediaStore.newMediaCampaign.dateReleased.getMonth() + 1) + "/" + mediaStore.newMediaCampaign.dateReleased.getDate() + "/" + mediaStore.newMediaCampaign.dateReleased.getFullYear()}
                                    name="dateReleased"
                                    value={mediaStore.newMediaCampaign.dateReleased}
                                    id="newCampaignDescription"
                        />
                    </label>
                    <label style={styles.formStyle} htmlFor="newVideoDescription"> Description
                        <textarea
                            className="form-control" onChange={this.setnewMediaCampaignProp}
                            placeholder="New Campaign Description"
                            type="text" name="description"
                            id="newCampaignDescription"/>
                    </label>

                </div>
                <TagAdder type="campaign"/>

                {JSON.stringify(mediaStore.newMediaCampaign)}
            </div>
        ];

// MAIN DIALOG
        return (
            <Dialog
                title={
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <FlatButton style={{flex: 1, display: 'flex', justifyContent: 'start'}} onClick={() => {
                            this.decrementNewMediaIndex(1)
                        }} icon={<Back/>}/>
                        <span style={{flex: 1, textAlign: 'center'}}>New Media Wizard</span>
                        <span style={{flex: 1}}></span>
                    </div>
                }
                titleStyle={{textAlign: 'center'}}
                actions={actions}
                modal={true}
                contentStyle={styles.addMediaModal[mediaStore.newMediaWizardIndex]}
                open={this.props.open}
            >

                {addMediaWizardTemplates[mediaStore.newMediaWizardIndex]}
            </Dialog>
        )
    }

}