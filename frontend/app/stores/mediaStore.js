import {action, computed, observable} from 'mobx';
import axios from 'axios';
import _ from 'lodash'
class MediaStore {
    @observable currentMediaItems = [];
    @observable advancedSearchIsVisible = false;
    @observable addMediaModalIsOpen = false;
    @observable newMediaCampaign = {
        tags: []
    };
    @observable currentCampaign = {};
    @observable mediaCampaigns = [];
    @observable newMediaItem = {
        tags: [],
        campaigns: []
    };
    @observable newMediaWizardIndex = 0;
    @observable tagSuggestions = ["Sisel", "intrepid", "fucoydon"];
     mediaQuery = {};

    constructor() {
        // this.currentMediaItems = [];
        // this.advancedSearchIsVisible = false;
        // this.addMediaModalIsOpen = true;
    }

    // Get media. Automatically sorts by most recently updated.
    @action getMedia() {
        console.log("getting media", this.mediaQuery);
        axios.get('http://localhost:9000/media', {params: this.mediaQuery}).then(response => {
            console.log("results", response.data);
            this.currentMediaItems = _.sortBy(response.data, [(item) => item.updatedAt]).reverse();
            console.log(this.currentMediaItems);
        })
    }

    @action debounceMediaSearch = _.debounce(this.getMedia, 300);

    @action toggleAdvancedSearch() {
        this.advancedSearchIsVisible = !this.advancedSearchIsVisible;
        console.log("23", this.advancedSearchIsVisible);
    }

    @action toggleOpenMediaModal() {
        this.newMediaWizardIndex = 0;
        this.addMediaModalIsOpen = !this.addMediaModalIsOpen;
        console.log("Media Modal", this.addMediaModalIsOpen);
    }

    @action clearNewMediaItem() {
        this.newMediaItem = {
            tags: [],
            campaigns: []
        };
    }

    @action clearNewMediaCampaign() {
        this.newMediaCampaign = {
            tags: []
        };
    }

    @action setNewMediaCampaignProp = (property, value) => {
        console.log(property, value);
        this.newMediaCampaign[property] = value;
        console.log(this.newMediaItem);
    };

    @action setNewMediaItemProp(property, value) {
        console.log(property, value);
        this.newMediaItem[property] = value;
        console.log(this.newMediaItem);
    }

    @action handleNewItemTagDelete(i) {
        let tags = this.newMediaItem.tags;
        tags.splice(i, 1);
        // this.setState({tags: tags});
    };

    @action handleNewItemTagAddition(tag) {
        let tags = this.newMediaItem.tags;
        tags.push({
            id: tags.length + 1,
            text: tag
        });
    };

    @action handleNewItemTagDrag(tag, currPos, newPos) {
        let tags = this.newMediaItem.tags;

        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);
    };

    @action handleNewCampaignTagDelete(i) {
        let tags = this.newMediaCampaign.tags;
        tags.splice(i, 1);
    };

    @action handleNewCampaignTagAddition(tag) {
        let tags = this.newMediaCampaign.tags;
        tags.push({
            id: tags.length + 1,
            text: tag
        });
    };

    @action handleNewCampaignTagDrag(tag, currPos, newPos) {
        let tags = this.newMediaCampaign.tags;

        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);
    };

    @action incrementnewMediaWizardIndex(incrementAmount) {
        this.newMediaWizardIndex += incrementAmount;
    }

    @action decrementnewMediaWizardIndex(decrementAmount) {
        this.newMediaWizardIndex -= decrementAmount;
    }

    @action submitNewMediaItem() {
        let postURL;
        let record;
        console.log("current Index", this.newMediaWizardIndex);
        console.log("Should post this", this.newMediaItem);

        if (this.newMediaWizardIndex === 1) {
            postURL = 'http://localhost:9000/media'
            record = this.newMediaItem;
        } else if (this.newMediaWizardIndex === 2) {
            postURL = 'http://localhost:9000/media/campaign'
            record = this.newMediaCampaign;
        }

        axios.post(postURL, record)
            .then((response) => {
                console.log("post response", response.data);
                if (response.data._id) {
                    this.clearNewMediaItem();
                    this.clearNewMediaCampaign();
                    this.toggleOpenMediaModal();
                }
            });
    }

    @action getCampaigns() {
        axios.get("http://localhost:9000/media/campaign")
            .then((response) => {
                let campaigns = response.data;
                if (campaigns.length)
                    this.mediaCampaigns = _.sortBy(campaigns, [(item) => item.updatedAt]).reverse();
                console.log(this.mediaCampaigns);
            })
    }

    @action addOrRemoveCampaignToMediaItem(campaignId) {
        console.log(campaignId);
        let index = this.newMediaItem.campaigns.indexOf(campaignId);
        if (index > -1) {
            this.newMediaItem.campaigns.splice(index, 1);
        } else {
            this.newMediaItem.campaigns.push(campaignId);
        }
    }

    @action addRemoveTypeForQuery(type) {
        // return if no type
        if(!type){
            return;
        }
        // creates types array if none exists
        if (!this.mediaQuery.types) {
            this.mediaQuery.types = [];
        }

        // add or remove type
        let index = this.mediaQuery.types.indexOf(type);
        if (index < 0) {
            this.mediaQuery.types.push(type);
        } else {
            this.mediaQuery.types.splice(index, 1);
        }
        console.log(this.mediaQuery.types);
    }

}

const mediaStore = new MediaStore();
export default mediaStore;