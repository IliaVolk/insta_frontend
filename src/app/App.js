/* general */
import React from 'react';
import { browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router';



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



