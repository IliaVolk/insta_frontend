import tagsService from "./../../service/TagService"
import {observable} from "mobx"
import ListModel from "./../common/ListModel"
import autobind from "autobind-decorator"
import messageService from "./../common/messageService"
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
    @autobind
    delete(){
        if (!this.getEditingItem().size){
            super.delete()
        }else {
            messageService.error("Cant delete used tag yet")
        }
    }



}