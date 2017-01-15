import tagsService from "./../../service/TagService"
import {observable} from "mobx"
import ListModel from "./../common/ListModel"
import autobind from "autobind-decorator"
export default class TagsModel extends ListModel{

    service = tagsService



    constructor() {
        super()
        this.loadData()
    }
    @autobind
    setEditingItemName(event){
        this.editingItem.name = event.target.value
    }
    @autobind
    setAddItemName(event){
        this.toAdd.name = event.target.value
    }



}