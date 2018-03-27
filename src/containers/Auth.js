import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Input, Spinner } from '../components/UI';
import styleClasses from './Auth.css';
import { actions, authMethod } from '../store';
// import errorHandler from './errorHandler';
// import axios from 'axios';

const loginForm = {
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Login email',
    },
    value: '',
    validation: {
      required: true,
      isEmail: true,
    },
    valid: false,
    isTouched: false,
  },
  password: {
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'Password',
    },
    value: '',
    validation: {
      required: true,
      minLength: 6,
    },
    valid: false,
    isTouched: false,
  },
};

class Auth extends Component {
  state = {
    loginForm,
    isFormValid: false,
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.isBuilding && this.props.authRedirectPath !== '/') {
      this.props.resetAuthRedirectPath();
    }
  }

  render() {
    if (this.props.isAuth) {
      return <Redirect to={this.props.authRedirectPath} />;
    }

    const formElements = Object.keys(this.state.loginForm).map(key => {
      const formElement = this.state.loginForm[key];
      return (
        <Input
          key={key}
          elementType={formElement.elementType}
          elementConfig={formElement.elementConfig}
          value={formElement.value}
          isValid={formElement.valid}
          isTouched={formElement.isTouched}
          onChange={e => {
            this._updateInputValue(key, e.target.value);
          }}
        />
      );
    });

    const btnStr = this.state.isSignup ? authMethod.LOGIN : authMethod.SIGNUP;
    const form = this.props.isLoading ? (
      <Spinner />
    ) : (
      <form>
        {formElements}
        <Button
          btnType="Success"
          onClick={this._onFormBtnClick}
          disabled={!this.state.isFormValid}
        >
          {this.state.isSignup ? authMethod.SIGNUP : authMethod.LOGIN}
        </Button>
      </form>
    );
    let errorMsg;
    if (this.props.error) {
      errorMsg = <p>{this.props.error.message}</p>;
    }

    return (
      <div className={styleClasses.Auth}>
        {errorMsg}
        {form}
        <Button btnType="Danger" onClick={this._switchAuthMode}>
          Switch to {btnStr}
        </Button>
      </div>
    );
  }

  _onFormBtnClick = () => {
    const email = this.state.loginForm.email.value;
    const password = this.state.loginForm.password.value;
    const method = this.state.isSignup ? authMethod.SIGNUP : authMethod.LOGIN;
    this.props.onAuth(email, password, method);
  };

  _checkValidity = (value, rules) => {
    if (!rules || Object.keys(rules).length === 0) {
      return true; // empty rules. Don't need validation
    }
    let isValid = true;
    const trimmedVal = value.trim();
    if (rules.required) {
      isValid = trimmedVal !== '';
    }
    if (rules.minLength) {
      isValid = isValid && trimmedVal.length >= rules.minLength;
    }
    if (rules.maxLength) {
      isValid = isValid && trimmedVal.length <= rules.maxLength;
    }
    if (rules.type && rules.type === 'number') {
      isValid = isValid && !trimmedVal.match(/[^0-9]/g);
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = isValid && pattern.test(trimmedVal);
    }
    return isValid;
  };

  _updateInputValue = (key, value) => {
    const newLoginForm = { ...this.state.loginForm };
    const newElement = { ...this.state.loginForm[key] };
    newElement.value = value;
    newElement.valid = this._checkValidity(value, newElement.validation);
    newElement.isTouched = true;
    newLoginForm[key] = newElement;

    // update form validation
    const isFormValid = Object.values(newLoginForm)
      .map(element => element.valid)
      .reduce((acc, cur) => acc && cur);

    this.setState({
      loginForm: newLoginForm,
      isFormValid: isFormValid,
    });
  };

  _switchAuthMode = () => {
    this.setState(prevState => ({ isSignup: !prevState.isSignup }));
  };
}

const mapStateToProps = state => ({
  isLoading: state.auth.loading,
  error: state.auth.error,
  isAuth: !!state.auth.token,
  isBuilding: state.burgerBuilder.isBuilding,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, method) =>
    dispatch(actions.auth(email, password, method)),
  resetAuthRedirectPath: () => dispatch(actions.setAuthRedirect('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  // errorHandler(Auth, axios)
  Auth
);
