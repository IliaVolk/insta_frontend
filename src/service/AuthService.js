import fetch from "isomorphic-fetch"

import Service from "./Service"

export class AuthService extends Service{
    constructor(){
        super("")
    }
    getAuthUrl(){
        return fetch(this.origin+"auth/instagram/url")
            .then(this.toJson)
            .then(this.checkErrors)
    }
}


export default new AuthService()