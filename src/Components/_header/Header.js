import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import logo from '../../logo.svg';
import './header.css';


class Header extends Component {

    render() {

        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">Welcome to React</h1>
                <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/admin'>Admin</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/roster'>Roster</Link></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;


