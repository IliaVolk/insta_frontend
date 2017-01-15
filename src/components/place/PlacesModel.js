import ListModel from "./../common/ListModel"
import placesService from "./../../service/PlaceService"
import autobind from "autobind-decorator"
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
}