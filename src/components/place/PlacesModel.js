import ListModel from "./../common/ListModel"
import placesService from "./../../service/PlaceService"
import autobind from "autobind-decorator"
import messageService from "./../common/messageService"

export default class PlacesModel extends ListModel{
    service = placesService

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
        }else{
            messageService.error("Cant delete used place")
        }
    }
}