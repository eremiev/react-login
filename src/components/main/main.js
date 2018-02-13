import React, {Component} from 'react';
import {socket} from '../app/App';

export default class Main extends Component {

    constructor(props) {
        super(props);

        this.onListening = this.onListening.bind(this);
    }

    componentDidMount() {
        this.onListening();
        console.log('mount');
        // socket.emit('checkLocationRange', {
        //     device_id: this.props.deviceId,
        //     latitude: this.props.lat,
        //     longitude: this.props.lon
        // });
    }

    componentDidUpdate() {
        console.log('update');

        socket.emit('checkLocationRange', {
            device_id: this.props.deviceId,
            latitude: this.props.lat,
            longitude: this.props.lon
        });

    }


    onListening() {
        socket.on("checkLocationRange", result => {
            console.log('result', result);
        });
    }

    render() {

        return (
            <div>
                <h1>Wellcome, {this.props.user.username}</h1>
                <p>Chat lists...</p>
            </div>
        );
    }
};

