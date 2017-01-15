import fetch from "isomorphic-fetch"

export default class Service {
    origin = "http://polar-crag-68604.herokuapp.com/rest/"
	//origin = "http://localhost:8080/rest/";
    constructor(url) {
        this.url = url
    }
    toJson(res){
        return res.json()
    }
    checkErrors = data=>{
        return data
    }
    update(data){
        return this.put(data)
    }
    get(id){
        return fetch(this.origin+this.url)
            .then(this.toJson)
            .then(this.checkErrors)
            .then(data=>{
                if (id){
                    return data.find(val=>val.id = id)
                }else{
                    return data
                }
            })
    }
    post(data){
        return fetch(this.origin+this.url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(this.toJson)
            .then(this.checkErrors)
    }
    put(data){
        return fetch(this.origin+this.url+"/"+data.id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })
            .then(this.toJson)
            .then(this.checkErrors)
    }
    delete(data){
        return fetch(this.origin+this.url+"/"+data.id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(this.toJson)
            .then(this.checkErrors)
    }
}