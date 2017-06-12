import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createNewUser } from '../action-creators/login';

/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = { name: '', email: '', password: '' };
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onSignupSubmit}>
            <div className="form-group">
              <label>name</label>
              <input
                name="name"
                type="text"
                className="form-control"
                required
                onChange={this.handleChange('name')}
              />
            </div>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                required
                onChange={this.handleChange('email')}
              />
            </div>
            <div className="form-group">
              <label>password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                required
                onChange={this.handleChange('password')}
              />
            </div>
            <button type="submit" className="btn btn-block btn-primary">{message}</button>
          </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/auth/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>{message} with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }

  handleChange(key) {
    return (evt) => {
        this.setState({[key] : evt.target.value});
    }
  }

  onSignupSubmit(event) {
    const { message } = this.props;
    event.preventDefault();
    this.props.createNewUser(this.state.name, this.state.email, this.state.password);
    this.props.history.push('/items');
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Sign up' });
const mapDispatch = ({createNewUser});

export default connect(mapState, mapDispatch)(Signup);
