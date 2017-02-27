import {action, computed, observable} from 'mobx';
import axios from 'axios';
import _ from 'lodash'
class MediaStore {
    @observable currentMediaItems = [];
    @observable advancedSearchIsVisible = false;
    @observable addMediaModalIsOpen = true;
    @observable currentCampaign = {};
    @observable newMediaItem = {};
    @observable newMediaWizardIndex = 0;

    constructor() {
        // this.currentMediaItems = [];
        // this.advancedSearchIsVisible = false;
        // this.addMediaModalIsOpen = true;
    }

    @action getMedia() {
        console.log("getting media");
        axios.get('http://localhost:9000/media').then(response => {
            console.log("results", response.data);
            this.currentMediaItems = response.data;
            console.log(this.currentMediaItems);
        })
    }

    @action debounceMediaSearch = _.debounce(this.getMedia, 300);

    @action toggleAdvancedSearch() {
        this.advancedSearchIsVisible = !this.advancedSearchIsVisible;
        console.log("23", this.advancedSearchIsVisible);
    }

    @action toggleOpenMediaModal() {
        this.addMediaModalIsOpen = !this.addMediaModalIsOpen;
        console.log("Media Modal", this.addMediaModalIsOpen);
    }

    @action clearnewMediaItem(){
        this.newMediaItem = {};
    }

    @action setNewMediaItemProp(property, value) {
        console.log(property, value);
        this.newMediaItem[property] = value;
        console.log(this.newMediaItem);
    }

    @action incrementnewMediaWizardIndex(incrementAmount){
        this.newMediaWizardIndex += incrementAmount;
    }

    @action decrementnewMediaWizardIndex(decrementAmount){
        this.newMediaWizardIndex += decrementAmount;
    }
}

const mediaStore = new MediaStore();
export default mediaStore;