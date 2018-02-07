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
            lat: '',
            lon: '',
            serverUserList: {},
            serverUser: {}
        };

        this.onListening = this.onListening.bind(this);
        this.onCheckUser = this.onCheckUser.bind(this);
        this.onUpdateLoginResponse = this.onUpdateLoginResponse.bind(this);
        this.onShowError = this.onShowError.bind(this);
        this.onShowPosition = this.onShowPosition.bind(this);
    }

    componentDidMount() {
        this.onListening();
        this.onGetLocation();
    }

    onListening() {
        socket.on("login", loginData => {
            this.onUpdateLoginResponse(loginData.logged, loginData.user, loginData.userList);
            this.onPerformLogin();
        });
    }

    onUpdateLoginResponse(logged, serverUser = null, serverUserList = null) {
        this.setState({logged, serverUser, serverUserList});
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
            // console.log(this.state.serverUser, this.state.serverUserList);
        }
    }


    onGetLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.onShowPosition, this.onShowError);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    onShowPosition(position) {
        this.setState({lat: position.coords.latitude, lon: position.coords.longitude});
    }

    onShowError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.log("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.");
                break;
        }
    }

    render() {
        const {logged, serverUser, lat, lon} = this.state;
        return (
            <div style={{textAlign: "center"}}>


                {logged
                    ?
                    <div>
                        <h1>Wellcome, {serverUser.username}</h1>
                        <p>Your locations are: lat {lat ? lat : '...'} and lon {lon ? lon : '...'}</p>
                        <p>Chat lists...</p>
                    </div>
                    :
                    <Login onInputChange={username => this.setState({username})} checkUser={this.onCheckUser}/>
                }
            </div>
        );
    }
}
