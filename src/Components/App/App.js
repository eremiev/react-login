import React, {Component} from 'react';
import Header from '../_header/Header';
import Main from '../Main/Main';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Main/>
            </div>
        );
    }
}

export default App;
