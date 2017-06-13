import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createUserSession } from '../action-creators/login';
/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onLoginSubmit}>
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
            <h4><br />OR...</h4>
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

  onLoginSubmit(event) {
    const { message } = this.props;
    event.preventDefault();
    this.props.createUserSession(this.state.email, this.state.password);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => ({ message: 'Log in', login: state.login });
const mapDispatch = ({createUserSession});

export default connect(mapState, mapDispatch)(Login);
