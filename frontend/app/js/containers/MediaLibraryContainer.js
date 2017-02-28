import React, {Component} from 'react';
import {observer} from 'mobx-react';
import mediaStore from "../../stores/mediaStore";
import ImageMediaCard from "../components/cards/ImageMediaCard";
import VideoMediaCard from "../components/cards/VideoMediaCard";
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
        borderColor: red900,
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
        alignItems: 'center'
    },
    addMediaModal: {
        width: '80%',
        maxWidth: 'none',
    }

};

@observer
export default class MediaLibraryContainer extends Component {
  state = {
     openModal: mediaStore.addMediaModalIsOpen,
    };
    componentWillMount() {
        console.log(mediaStore.addMediaModalIsOpen);
    }

    toggleOpenModal = () =>{
        mediaStore.toggleOpenMediaModal();
        this.setState({openModal: !this.state.openModal});
    }

    activeTypeSearchMedia = () => {
        // let debounceSearch = _.debounce(mediaStore.getMedia, 250);
        // debounceSearch();
        mediaStore.debounceMediaSearch();
    };

    searchMedia=()=>{
        console.log(mediaStore.advancedSearchIsVisible);
        mediaStore.getMedia();
    };

    toggleAdvanced = () => {
        console.log(mediaStore.advancedSearchIsVisible);
        mediaStore.toggleAdvancedSearch();
    };

    render() {

        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <div style={{flex: 1}}></div>
                    <h1 style={{flex: 1, textAlign: 'center'}}>Media Library </h1>
                    <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <RaisedButton
                            onClick={this.toggleOpenModal}
                            labelPosition="before"
                            label="Add new"
                            labelStyle={styles.addMoreButtonStyle}
                            icon={<Add/>}
                            backgroundColor={red500}
                            style={{marginRight: 15}}/>
                    </div>
                </div>
                <div style={{margin: 15}}>
                    <TextField
                        onChange={this.activeTypeSearchMedia}
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
                        icon={<Search/>}
                        backgroundColor={red500}
                        style={{marginLeft: 15}}/>
                </div>
                <div style={{marginTop: -20}}>
                    <FlatButton onClick={this.toggleAdvanced}
                                rippleColor={red500}
                                labelPosition="before"
                                label="Advanced options"
                                icon={mediaStore.advancedSearchIsVisible ? <ExpandLess color={red500}/> :
                                    <ExpandMore color={red500}/>}
                                labelStyle={styles.dropDownButtonStyle}
                    /></div>
                {mediaStore.advancedSearchIsVisible ? (
                        <div>
                            Advanced Options
                        </div>
                    ) : ""}
                <div className="row" style={styles.resultsArea}>
                    <ImageMediaCard/>
                    <ImageMediaCard/>
                    <ImageMediaCard/>
                    <VideoMediaCard/>
                </div>
                {this.props.children}
                {JSON.stringify(mediaStore.currentMediaItems)}
                {/*Dialog for adding stuff*/}
               <AddMediaDialog open={mediaStore.addMediaModalIsOpen} newMediaItem={mediaStore.newMediaItem} toggleOpen={this.toggleOpenModal}/>
            </div>
        )
    }
}