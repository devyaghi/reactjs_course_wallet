import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from "./Components/Login";
import Registeration from "./Components/Registeration";
import Dash from "./Components/Dash";
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
import Popper from 'popper.js'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import Add from "./Components/Add";
import Edit from "./Components/Edit";



const route_rules=(
    <Router>
        <div className='container-fluid' >

            <Route path={'/'} component={Login} exact/>
            <Route path={'/Dash'} component={Dash}/>
            <Route path={'/Register'} component={Registeration}/>
            <Route path={'/Add'} component={Add}/>
            <Route path={'/Edit/:id'} component={Edit}/>

        </div>
    </Router>
)

ReactDOM.render(

      route_rules

         ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
