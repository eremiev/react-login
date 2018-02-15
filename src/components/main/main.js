import _ from 'lodash';
import React, {Component} from 'react';
import {socket} from '../app/App';

export default class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            roomInfo: '',
            inPlace: false,
            nearPlaces: {}
        };

        this.onListening = this.onListening.bind(this);
        this.renderPlaces = this.renderPlaces.bind(this);
    }

    componentDidMount() {
        this.onListening();
        console.log('mount');
        socket.emit('checkLocationRange', {
            device_id: this.props.user.deviceId,
            latitude: this.props.lat,
            longitude: this.props.lon
        });
    }

    componentDidUpdate() {
        console.log('update');

        // socket.emit('checkLocationRange', {
        //     device_id: this.props.user.deviceId,
        //     latitude: this.props.lat,
        //     longitude: this.props.lon
        // });
    }

    renderPlaces() {

        //convert Array-like objects to (obj or array)
        var placesArrOrObj = Array.prototype.slice.call(this.state.nearPlaces);

        return placesArrOrObj.map(el => {
            return (
                <li className="list-item">{el.placeName} - {_.round(el.distanceFromYourPoint) / 1000} km</li>
            );
        });
    }

    onListening() {
        socket.on("checkLocationRange", result => {
            console.log('result', result);
            this.setState({inPlace: result.inPlace, nearPlaces: result.nearPlaces});
        });
    }

    render() {
        const {nearPlaces, inPlace} = this.state;

        return (
            <div>
                {/*<h1>Wellcome, {this.props.user.username}</h1>*/}
                {/*<p>Chat lists...</p>*/}
                {
                    nearPlaces
                        ?
                        <div className="col-md-4 col-md-offset-4">
                            {
                                inPlace
                                    ?
                                    <div className="alert alert-dismissible alert-primary">You are in place:...</div>
                                    :
                                    <div className="alert alert-dismissible alert-warning"><p className="text-center">You are not in place.</p></div>

                            }
                            <h3>Closest places are:</h3>
                            <ul className="list-item-group">
                                {this.renderPlaces()}
                            </ul>
                        </div>
                        :
                        <div> Loading places ... </div>
                }


            </div>
        );
    }
};

