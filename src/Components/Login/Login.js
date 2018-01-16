import React, {Component} from 'react';
import Input from './Input';

class Login extends Component {
    render() {
        return (
            <div>
                <Input id="login" type="text" placeholder="LOGIN"/>
                <Input id="password" type="password" placeholder="PASSWORD"/>
                <button>Submit</button>
            </div>
        );
    }
}

export default Login;
