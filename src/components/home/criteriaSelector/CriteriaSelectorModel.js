import CriteriaSelectorComponent from "./CriteriaSelectorComponent"

import locked from "./locked"
import {observable, computed} from "mobx"
export default class CriteriaSelectorModel{
    @observable
    title
    @observable
    _values
    @observable
    _isOpened
    @observable
    value
    @observable
    _canHide
    @observable
    isMultiple

    constructor({title, provider, onSelect=()=>[], isMultiple=true, getSelected = ()=>[]}) {
        this.title = title
        this._values = []
        this.onSelect = onSelect
        this._isOpened = false
        this.value = ""
        this._canHide = true
        this.isMultiple = isMultiple
        this.getSelected = getSelected
        provider.get()
            .then((values)=>{
                this._values = values.sort((v1,v2)=>v2.size-v1.size)
            })
        this.setValue = this.setValue.bind(this)
        this.showTips = this.showTips.bind(this)
        this.hideTips = this.hideTips.bind(this)
        this.setValue = this.setValue.bind(this)
        this.toggleTips = this.toggleTips.bind(this)
        this.setFocusRef = this.setFocusRef.bind(this)
        this.selectValue = locked(this.selectValue, this)
        this.setIsOpen = locked(this.setIsOpen, this)
        this.canHide = this.canHide.bind(this)
        this.cantHide = this.cantHide.bind(this)
    }
    @computed
    get selected(){
        return this.getSelected()
    }
    @computed
    get isOpened(){
        return this._isOpened
    }
    set isOpened(value){
        this.setIsOpen(value)
    }
    setIsOpen(value){
        this._isOpened = value
    }
    @computed
    get values(){
        return this._values
            .filter(v=>v.name.indexOf(this.value)>-1)
            .filter(v=>!this.getSelected().find((s)=>s.name===v.name))
    }
    selectValue(value){
        this.onSelect(value)
        if (this.isMultiple){
            this.focusRef.focus()
        }else{
            this._canHide = true
            this._isOpened = false
            this.focusRef.blur()
        }
    }
    showTips(){
        this.isOpened = true
    }
    hideTips(){
        if (this._canHide){
            this.isOpened = false
        }else{
            this.focusRef.focus()
        }
    }
    setValue(value){
        this.value = value
    }
    toggleTips(){
        this.isOpened = !this.isOpened
    }
    setFocusRef(ref){
        this.focusRef = ref
    }

    canHide(){
        this._canHide = true
    }
    cantHide(){
        this._canHide = false
    }
}