/* general */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createHistory } from 'history';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
require('es6-promise').polyfill();
require('isomorphic-fetch');
/* components */
import App from './App.js';
import Home from '../components/home/Home';
import Tags from "../components/tag/Tags"
import Places from "../components/place/Places"
import Stores from "../components/store/Stores"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { IndexRoute, Route, Router, browserHistory, useRouterHistory, IndexRedirect } from 'react-router';

const history = useRouterHistory(createHistory)({
    basename: '/'
});

document.write(`<link rel="stylesheet"
href="//cdnjs.cloudflare.com/ajax/libs/flexboxgrid/6.3.1/flexboxgrid.min.css" type="text/css" >
`)
render(
    (<MuiThemeProvider>
        <Router history={history} onUpdate={() => window.scrollTo(0, 0)} >
            <Route path="/" component={App}>
                <IndexRedirect to="home"/>
                <Route path="home" component={Home}/>
                <Route path="tags" component={Tags}/>
                <Route path="places" component={Places}/>
                <Route path="stores" component={Stores}/>
            </Route>
        </Router>
    </MuiThemeProvider>),
    document.getElementById('root')
);

