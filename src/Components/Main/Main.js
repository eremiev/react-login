import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'
import Roster from '../Roster/Roster';
import Login from '../Login/Login';
import Admin from '../Admin/Admin';
import Home from '../Home/Home';

class Main extends Component {
    render() {

        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/admin' component={Admin}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/roster' component={Roster}/>
                </Switch>
            </main>
        );
    }
}

export default Main;
