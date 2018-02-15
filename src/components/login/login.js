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
            <div className="col-md-4 col-md-offset-4">
                <form onSubmit={this.onSubmit}>
                    <div className="input-group">
                        <input className="form-control" value={this.state.username} onChange={this.onInputChange} placeholder='Name'/>
                        <span className="input-group-btn">
                            <button className="btn btn-primary">Submit</button>
                             </span>
                    </div>
                </form>
            </div>
        );
    }
}