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
            response: false,
            username: '',
            fPrint: (new Fingerprint2()).getSync().fprint
        };

        this.onListening = this.onListening.bind(this);
        this.onCheckUser = this.onCheckUser.bind(this);
    }

    componentDidMount() {
        this.onListening();
    }

    onListening() {

        socket.on("login", data => {
            console.log(data)
        });
    }

    onCheckUser() {
        socket.emit('checkUserLogin', {deviceId: this.state.fPrint, username: this.state.username});
    }

    render() {
        const {response} = this.state;
        return (
            <div style={{textAlign: "center"}}>
                {response
                    ?
                    <p>Chat lists...</p>
                    :
                    <Login onInputChange={username => this.setState({username})} checkUser={this.onCheckUser}/>
                }
            </div>
        );
    }
}
