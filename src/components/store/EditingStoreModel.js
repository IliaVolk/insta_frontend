import tagService from "./../../service/TagService"
import placeService from "./../../service/PlaceService"
import {observable} from "mobx"
import autobind from "autobind-decorator"
import CriteriaSelectorModel from "./../home/criteriaSelector/CriteriaSelectorModel"
export default class EditingStoreModel {
    @observable
    item
    constructor() {
        this.tagSelector = new CriteriaSelectorModel({
            title: "Select tag:",
            provider: tagService,
            isMultiple: true,
            onSelect:this.addTag,
            getSelected: ()=>this.item.tags
        })
        this.placeSelector = new CriteriaSelectorModel({
            title: "Select place:",
            provider: placeService,
            isMultiple: false,
            onSelect:this.setPlace,
            getSelected: ()=>[this.item.place]
        })
        this.refresh()
    }
    refresh(){
        this.item = {
            url: "",
            image: "",
            name: "",
            tags: [],
            place: {}
        }
    }
    setItem(val){
        this.item = Object.assign({}, val)
        this.item.tags = val.tags.slice()
        this.item.place = val.place
    }
    @autobind
    setNameEvent(e){
        this.setName(e.target.value)
    }
    @autobind
    setName(val){
        this.item.name = val
    }
    @autobind
    setUrlEvent(e){
        this.setUrl(e.target.value)
    }
    @autobind
    setUrl(val){
        this.item.url = val
    }
    @autobind
    setPlace(val){
        this.item.place = val
    }
    @autobind
    setImageEvent(e){
        this.setImage(e.target.value)
    }
    @autobind
    setImage(val){
        this.item.image = val
    }
    @autobind
    addTag(tag){
        if (this.item.tags.find(t=>t.id===tag.id)){
            return
        }
        this.item.tags.push(tag)
        return this.item.tags
    }
    @autobind
    removeTag(tag){
        this.item.tags = this.item.tags.filter(t=>t.id !== tag.id)
    }
}