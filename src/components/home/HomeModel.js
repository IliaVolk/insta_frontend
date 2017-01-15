import CriteriaSelectorModel from "./criteriaSelector/CriteriaSelectorModel"
import PlaceService from "./../../service/PlaceService"
import TagService from "./../../service/TagService"
import StoreService from "./../../service/StoreService"
import HomeComponent from "./HomeComponent"
import {observable} from "mobx"
import autobind from "autobind-decorator"
import { browserHistory } from 'react-router';

export default class HomeModel{
    @observable
    isLoading
    @observable
    stores
    @observable
    selectedTags
    @observable
    selectedPlace

    constructor() {
        this.placeSelector = new CriteriaSelectorModel({
            title: "Select place:",
            provider: PlaceService,
            isMultiple:false,
            onSelect:this.setPlace,
            getSelected: ()=>[this.selectedPlace||{}]
        })
        this.tagSelector = new CriteriaSelectorModel({
            title: "Select tag:",
            provider: TagService,
            isMultiple: true,
            onSelect:this.addTag,
            getSelected: ()=>this.selectedTags
        })
        this.storeService = StoreService
        this.stores = []
        this.selectedTags = []


    }
    @autobind
    getSearchResults(){
        console.log("GO SEARCH")
        this.isLoading = true
        this.storeService.search({
                tags: this.selectedTags,
                place: this.selectedPlace
            })
            .then((stores)=>{
                this.isLoading = false
                this.stores = stores
            })
    }
    @autobind
    goSearch(){
        browserHistory.push("/home?"+this.storeService.getSearchUrlParams({
                tags: this.selectedTags,
                place: this.selectedPlace
            }))
        this.getSearchResults()
    }
    @autobind
    addTag(tag){
        if (this.selectedTags.find(t=>t.name===tag.name)){
            return
        }
        this.selectedTags.push(tag)
        return this.selectedTags
    }
    @autobind
    setPlace(place){
        this.selectedPlace = place
        return [place]
    }
    @autobind
    removeTag(tag){
        this.selectedTags = this.selectedTags.filter(t=>t.name !== tag.name)
    }
    @autobind
    clearTags(){
        this.selectedTags = []
    }
}