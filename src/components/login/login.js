import React, {Component} from 'react';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: ''
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onInputChange(event) {
        this.setState({
            username: event.target.value
        });
        this.props.onInputChange(event.target.value);
    }

    onSubmit(event) {
        event.preventDefault();

        //check user
        this.props.checkUser();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input value={this.state.username} onChange={this.onInputChange} placeholder='Name'/>
                    <span>
                  <button>Submit</button>
                    </span>
                </form>
            </div>
        );
    }
}