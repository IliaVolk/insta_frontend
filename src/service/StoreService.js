import Service from "./Service"
import fetch from "isomorphic-fetch"

class StoreService extends Service{
    constructor() {
        super("stores")
    }
    prepareData(_data){
        var data = Object.assign({}, _data)
        if (data.tags){
            data.tags = data.tags.map(tag=>({id:tag.id}))
        }
        if (data.place && data.place.id){
            data.place = {id:data.place.id}
        }else {
            data.place = null
        }
        return data
    }
    post(data){
        debugger
        return super.post(this.prepareData(data))
    }
    put(data){
        return super.put(this.prepareData(data))
    }
    getSearchUrlParams({tags=[], place={}}){
        let url = (tags.length?
            "tags="+tags.map(t=>window.encodeURIComponent(t.name)).join(","):"")+
            (place.name?"&place="+window.encodeURIComponent(place.name):"")
        return url
    }
    search(params){
        let url = this.getSearchUrlParams(params)
        return fetch((this.origin+this.url+"/search?")+url)
            .then(this.toJson)
            .then(this.checkErrors)
            .then(data=>{
                return data
            })
            .then(this.handleGetRes)
    }
    get(id){
        return super.get(id)
            .then(this.handleGetRes)
    }
    handleGetRes(data){
        return data.map(value=>{
            if (!value.place){
                value.place = {}
            }
            if (!value.url){
                value.url = ""
            }
            if (!value.name){
                value.name = ""
            }
            if (!value.image){
                value.image = ""
            }
            return value
        })
    }

}

export default new StoreService()