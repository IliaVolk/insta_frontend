import ListModel from "./../common/ListModel"
import storeService from "./../../service/StoreService"
import tagService from "./../../service/TagService"

import EditingStoreModel from "./EditingStoreModel"
import {observable, computed} from "mobx"
import autobind from "autobind-decorator"



export default class StoresModel extends ListModel{
    service = storeService
    tagSelector
    placeSelector
    @observable
    toAddModel
    @observable
    editingItemModel

    getEditingItem(){
        return this.editingItemModel.item
    }
    getToAdd(){
        return this.toAddModel.item
    }
    @autobind
    setEditingItem(val){
        this.editingItemModel.setItem(val)
        this.openDialog()
    }


    constructor() {
        super()
        this.loadData()
        this.editingItemModel = new EditingStoreModel()
        this.toAddModel = new EditingStoreModel()
        this.refreshToAdd()
    }
    refreshToAdd(){
        this.toAddModel.refresh()
    }

}