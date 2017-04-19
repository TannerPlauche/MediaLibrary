import React, {Component} from 'react';
import {observer} from 'mobx-react';
import mediaStore from "../../stores/mediaStore";
import MediaCard from "../components/cards/MediaCard";
import AddMediaDialog from "../components/menu/AddMediaModal";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import Search from 'material-ui/svg-icons/action/search';
import Add from 'material-ui/svg-icons/action/note-add';

import {red900, red500} from 'material-ui/styles/colors'

const styles = {
    h1: {
        textAlign: "center"
    },
    inputFieldHelper: {
        color: red500,
        fontSize: 15
    },
    inputFieldHelperFocus: {
        color: red900,
        fontSize: 15
    },
    underlineTextStyle: {
        borderColor: red900
    },
    dropDownButtonStyle: {
        fontSize: 12,
        color: red500,
        textTransform: 'none'
    },
    addMoreButtonStyle: {
        // fontSize: 12,
        color: '#fff',
        textTransform: 'none'
    },
    resultsArea: {
        marginLeft: 10,
        marginRight: 10,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    addMediaModal: {
        width: '80%',
        maxWidth: 'none'
    },
    advancedQuerySection: {
        backgroundColor: '#d3d3d3',
        margin: 10
    },
    queryTypeLabel: {
        margin: 5
    }

};

@observer
export default class MediaLibraryContainer extends Component {
    state = {
        openModal: mediaStore.addMediaModalIsOpen
    };

    componentWillMount() {
        console.log(mediaStore.addMediaModalIsOpen);
    }

    toggleOpenModal = () => {
        mediaStore.toggleOpenMediaModal();
        this.setState({
            openModal: !this.state.openModal
        });
    };

    setQuerySearchString = (event) => {
        let value = event.target.value;
        mediaStore.setQuerySearchString(value);
    };

    searchMedia = () => {
        console.log(mediaStore.advancedSearchIsVisible);
        mediaStore.getMedia();
    };

    toggleAdvanced = () => {
        console.log(mediaStore.advancedSearchIsVisible);
        mediaStore.toggleAdvancedSearch();
    };

    addRemoveTypeForQuery = (event) => {
        console.log(event);
        console.log(event.target.name);
        let type = event.target.name;
        mediaStore.addRemoveTypeForQuery(type);
    };

    addRemoveOptionForQuery = (event) => {
        console.log(event);
        let property = event.target.name;
        let value = event.target.checked;
        console.log(property, value);
        mediaStore.addRemoveOptionForQuery(property, value);
    };

    render() {

        let mediaItems = mediaStore
            .currentMediaItems
            .map((item, index) => (<MediaCard key={index} mediaRecord={item}/>));

        return (
            <div>
                <div
                    style={{
                    display: 'flex',
                    justifyContent: 'space-around'
                }}>
                    <div style={{
                        flex: 1
                    }}></div>
                    <h1
                        style={{
                        flex: 1,
                        textAlign: 'center'
                    }}>Media Library
                    </h1>
                    <div
                        style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}>
                        <RaisedButton
                            onClick={this.toggleOpenModal}
                            labelPosition="before"
                            label="Add new"
                            labelStyle={styles.addMoreButtonStyle}
                            icon={< Add />}
                            backgroundColor={red500}
                            style={{
                            marginRight: 15
                        }}/>
                    </div>
                </div>
                <div style={{
                    margin: 15
                }}>
                    <TextField
                        onChange={this.setQuerySearchString}
                        underlineFocusStyle={styles.underlineTextStyle}
                        underlineStyle={styles.underlineTextStyle}
                        floatingLabelStyle={styles.inputFieldHelper}
                        floatingLabelFocusStyle={styles.inputFieldHelperFocus}
                        hintText="Search: Sisel Intrepid "
                        floatingLabelText="Media search:"/>
                    <RaisedButton
                        onClick={this.searchMedia}
                        labelPosition="before"
                        label="Search"
                        labelStyle={styles.addMoreButtonStyle}
                        icon={< Search />}
                        backgroundColor={red500}
                        style={{
                        marginLeft: 15
                    }}/>
                </div>
                <div style={{
                    marginTop: -20
                }}>
                    <FlatButton
                        onClick={this.toggleAdvanced}
                        rippleColor={red500}
                        labelPosition="before"
                        label="Advanced options"
                        icon={mediaStore.advancedSearchIsVisible
                        ? <ExpandLess color={red500}/>
                        : <ExpandMore color={red500}/>}
                        labelStyle={styles.dropDownButtonStyle}/></div>
                {mediaStore.advancedSearchIsVisible
                    ? (
                        <div>
                            Advanced Options
                            <div
                                style={{
                                display: 'flex',
                                flexWrap: 'wrap'
                            }}>
                                <div style={styles.advancedQuerySection}>
                                    <h6>Availability:</h6>
                                    <label style={styles.queryTypeLabel} htmlFor="customizableQuery"><input
                                        id="customizableQuery"
                                        name="customizable"
                                        type="checkbox"
                                        onChange={this.addRemoveOptionForQuery}/>
                                        Customizable
                                    </label>
                                    <label style={styles.queryTypeLabel} htmlFor="downloadableQuery"><input
                                        id="downloadableQuery"
                                        name="downloadable"
                                        type="checkbox"
                                        onChange={this.addRemoveOptionForQuery}/>
                                        Downloadable
                                    </label>
                                </div>

                                <div style={styles.advancedQuerySection}>
                                    <h6>Type:</h6>
                                    <label style={styles.queryTypeLabel} htmlFor="imageMediaQuery">
                                        <input
                                            id="imageMediaQuery"
                                            name="image"
                                            type="checkbox"
                                            onChange={this.addRemoveTypeForQuery}/>
                                        Image
                                    </label>
                                    <label style={styles.queryTypeLabel} htmlFor="videoMediaQuery">
                                        <input
                                            id="videoMediaQuery"
                                            name="video"
                                            type="checkbox"
                                            onChange={this.addRemoveTypeForQuery}/>
                                        video
                                    </label>
                                    <label style={styles.queryTypeLabel} htmlFor="audioMediaQuery">
                                        <input
                                            id="audioMediaQuery"
                                            name="audio"
                                            type="checkbox"
                                            onChange={this.addRemoveTypeForQuery}/>
                                        audio
                                    </label>
                                    <label style={styles.queryTypeLabel} htmlFor="pdfMediaQuery">
                                        <input
                                            id="pdfMediaQuery"
                                            name="pdf"
                                            type="checkbox"
                                            onChange={this.addRemoveTypeForQuery}/>
                                        PDF
                                    </label>
                                    <label style={styles.queryTypeLabel} htmlFor="presentationMediaQuery">
                                        <input
                                            id="presentationMediaQuery"
                                            name="presentation"
                                            type="checkbox"
                                            onChange={this.addRemoveTypeForQuery}/>
                                        Presentation
                                    </label>
                                    <label style={styles.queryTypeLabel} htmlFor="otherMediaQuery">
                                        <input
                                            id="otherMediaQuery"
                                            name="other"
                                            type="checkbox"
                                            onChange={this.addRemoveTypeForQuery}/>
                                        Other
                                    </label>
                                </div>
                            </div>
                            {JSON.stringify(mediaStore.mediaQuery)}
                        </div>
                    )
                    : ""}
                <div className="row" style={styles.resultsArea}>
                    {mediaItems}
                </div>
                {/*{JSON.stringify(mediaStore.currentMediaItems)}*/}
                <AddMediaDialog
                    open={mediaStore.addMediaModalIsOpen}
                    newMediaItem={mediaStore.newMediaItem}
                    toggleOpen={this.toggleOpenModal}/>
            </div>
        )
    }
}