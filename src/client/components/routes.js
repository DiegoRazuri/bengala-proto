/*
* Modul dependencies
*/

import React from 'react';
import ReactDom from 'react-dom';
import BengalaApp from './bengalaApp'
import Loggin from './loggin'
import { Router, Route, Link, browserHistory } from 'react-router'
import CallApp from './callApp'
import SellApp from './sellApp'
import ClientProvidersTable from './enterpriseprofileApp'
/*
ReactDom.render((
	<Router history={browserHistory}>
        <Route path="/" component={Layout}>
        </Route>
    </Router>
), document.getElementById('principalContainer'))
/*
ReactDom.render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>

      
    </Route>
  </Router>
), document.getElementById('principalContainer'));
/*     
	    <Route path="calificacion" component={ScoreTable}/>
        <Route path="colaboradores" component={EmployedTable}/>
        <Route path="clientesproveedores" component={ClientProvidersTable}/>
      */