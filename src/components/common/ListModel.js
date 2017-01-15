import {observable} from "mobx"
import autobind from 'autobind-decorator'

export default class ListModel {
    @observable
    isDialogOpened = false
    @observable
    data = []
    @observable
    isLoading = false
    @observable
    editingItem = {}
    @observable
    toAdd = {}
    constructor() {

    }
    getEditingItem(){
        return this.editingItem
    }

    getToAdd(){
        return this.toAdd
    }
    @autobind
    loadData(){
        this.isLoading = true
        this.service.get()
            .then(data=>{
                this.data = data
                this.isLoading = false
            })
    }
    @autobind
    delete(){
        this.isLoading = true
        this.service.delete(this.getEditingItem())
            .then(data=>{
                this.closeDialog()
                this.loadData();
            })
    }
    @autobind
    update(){
        this.isLoading = true
        this.service.put(this.getEditingItem())
            .then(data=>{
                this.closeDialog()
                this.loadData()
            })
    }
    @autobind
    add(){
        this.isLoading = true
        this.service.post(this.getToAdd())
            .then(data=>{
                this.refreshToAdd();
                this.loadData()
            })
    }

    @autobind
    setEditingItem(val){
        this.editingItem = Object.assign({}, val)
        this.openDialog()
    }
    @autobind
    openDialog(){
        this.isDialogOpened = true
    }
    @autobind
    closeDialog(){
        this.isDialogOpened = false
    }
    refreshToAdd(){
        this.toAdd = {}
    }

}