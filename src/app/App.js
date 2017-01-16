/* general */
import React from 'react';
import { browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router';

import messageService from "./../components/common/messageService"
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
// For Non ES6...
// var ToastContainer = ReactToastr.ToastContainer;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

/* styles */
import styles from './app.sass';

/* components */

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import AuthComponent from "./AuthComponent"

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {
        let route = this.props.children.props.route,
            children = this.props.children

        return (
            <div>
                <ToastContainer
                    toastMessageFactory={ToastMessageFactory}
                    ref={messageService.setRef}
                    className="toast-top-right"
                />

                <AppBar
                    title={<Link to="/home"><span>Insta App</span></Link>}
                    iconElementRight={<div className="color-alt">
                    <Link to="/tags"><FlatButton label="Tags"/></Link>
                    <Link to="/places"><FlatButton label="Places"/></Link>
                    <Link to="/stores"><FlatButton label="Stores"/></Link>
                    <AuthComponent/></div>}
                />
                {children}
            </div>
        )
    }
}



