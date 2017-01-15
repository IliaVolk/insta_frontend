import React from "react"
import {PropTypes} from "react"
import FlatButton from 'material-ui/FlatButton';
import authService from "./../service/AuthService"
export default class AuthComponent extends React.Component {
    authUrl
    constructor() {
        super()
        authService.getAuthUrl()
            .then(res=>{
                this.authUrl = res.url
            })
    }

    static get propTypes() {
        return {}
    }

    openAuthWindow = ()=>{
        window.addEventListener("message", (e)=>{
            if (e.origin === "http://localhost:8080" || e.origin === "https://polar-crag-68604.herokuapp.com"){
                window["instagram-auth-credentials"] = e.data
                this.forceUpdate()
            }
        }, false)
        window.open(this.authUrl, "", "width=640,height=480")
    }
    render() {
        var credentials = window["instagram-auth-credentials"]
        return <span>
            {credentials&&credentials.user?<span>Hello, {credentials.user.full_name}</span>:
                <a><FlatButton onClick={this.openAuthWindow} label="Authenticate"/></a>}
        </span>
    }
}