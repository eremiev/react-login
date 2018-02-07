import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import Fingerprint2 from 'fingerprintjs2sync';

import Login from '../login/login'
import './App.css';

const endpoint = "https://gentle-depths-77447.herokuapp.com/api/v1";
const socket = socketIOClient(endpoint);

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            logged: false,
            username: '',
            fPrint: (new Fingerprint2()).getSync().fprint,
            userList: {},
            user: {}
        };

        this.onListening = this.onListening.bind(this);
        this.onCheckUser = this.onCheckUser.bind(this);
        this.onUpdateLoginResponse = this.onUpdateLoginResponse.bind(this);
    }

    componentDidMount() {
        this.onListening();
    }

    onListening() {
        socket.on("login", loginData => {
            this.onUpdateLoginResponse(loginData.logged, loginData.user, loginData.userList);
            this.onPerformLogin();
        });
    }

    onUpdateLoginResponse(logged, user = null, userList = null) {
        this.setState({logged, user, userList});
    }

    onCheckUser() {
        socket.emit('checkUserLogin', {deviceId: this.state.fPrint, username: this.state.username});
    }

    onPerformLogin() {
        if (!this.state.logged) {
            //create new user
            socket.emit('performLogin', {deviceId: this.state.fPrint, username: this.state.username});
        } else {
            //user already have acc.
            // console.log(this.state.user, this.state.userList);
        }
    }

    render() {
        const {logged, user} = this.state;
        return (
            <div style={{textAlign: "center"}}>
                {logged
                    ?
                    <div>
                        <h1>Wellcome, {user.username}</h1>
                        <p>Chat lists...</p>
                    </div>
                    :
                    <Login onInputChange={username => this.setState({username})} checkUser={this.onCheckUser}/>
                }
            </div>
        );
    }
}
