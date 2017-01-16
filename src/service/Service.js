import fetch from "isomorphic-fetch"
import {ORIGIN} from "./../constants/Api";
import authStorage from "./../app/authStorage"

export default class Service {
    origin = ORIGIN
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
    getHeaders(){
        let headers = {
            'Content-Type': 'application/json',
        }
        try{
            let id =  authStorage.credentials.user.id
            if (id){
                headers["Authorization"] = id
            }
        }
        catch (e){}
        return headers

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
            headers: this.getHeaders(),
            body: JSON.stringify(data)
        })
            .then(this.toJson)
            .then(this.checkErrors)
    }
    put(data){
        return fetch(this.origin+this.url+"/"+data.id, {
            method: "PUT",
            headers: this.getHeaders(),
            body:JSON.stringify(data)
        })
            .then(this.toJson)
            .then(this.checkErrors)
    }
    delete(data){
        return fetch(this.origin+this.url+"/"+data.id, {
            method: "DELETE",
            headers: this.getHeaders()
        })
            .then(this.toJson)
            .then(this.checkErrors)
    }
}