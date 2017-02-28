import {action, computed, observable} from 'mobx';
import axios from 'axios';
import _ from 'lodash'
class MediaStore {
    @observable currentMediaItems = [];
    @observable advancedSearchIsVisible = false;
    @observable addMediaModalIsOpen = false;
    @observable currentCampaign = {};
    @observable newMediaItem = {};
    @observable newMediaWizardIndex = 0;

    constructor() {
        // this.currentMediaItems = [];
        // this.advancedSearchIsVisible = false;
        // this.addMediaModalIsOpen = true;
    }

    // Get media. Automatically sorts by most recently updated.
    @action getMedia() {
        console.log("getting media");
        axios.get('http://localhost:9000/media').then(response => {
            console.log("results", response.data);
            this.currentMediaItems = _.sortBy(response.data, [(item)=>item.updatedAt]).reverse();
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

    @action clearnewMediaItem() {
        this.newMediaItem = {};
    }

    @action setNewMediaItemProp(property, value) {
        console.log(property, value);
        this.newMediaItem[property] = value;
        console.log(this.newMediaItem);
    }

    @action incrementnewMediaWizardIndex(incrementAmount) {
        this.newMediaWizardIndex += incrementAmount;
    }

    @action decrementnewMediaWizardIndex(decrementAmount) {
        this.newMediaWizardIndex += decrementAmount;
    }

    @action submitNewMediaItem() {
        console.log("Should post this", this.newMediaItem);
        axios.post('http://localhost:9000/media', this.newMediaItem)
            .then((response) => {
                console.log("post response", response);
                if (response.data._id) {
                    this.clearnewMediaItem();
                    this.toggleOpenMediaModal();
                }
            });
    }
}

const mediaStore = new MediaStore();
export default mediaStore;