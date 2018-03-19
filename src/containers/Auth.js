import React, { Component } from 'react';
import { Button, Input } from '../components/UI';
import styleClasses from './Auth.css';

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
      type: 'text',
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
  };

  render() {
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

    return (
      <div className={styleClasses.Auth}>
        <form>
          {formElements}
          <Button
            btnType="Success"
            onClick={this._onFormBtnClick}
            disabled={!this.state.isFormValid}
          >
            Login
          </Button>
        </form>
      </div>
    );
  }

  _onFormBtnClick = () => {
    console.log('onLoginButtonClick');
  };

  _checkValidity(value, rules) {
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
  }

  _updateInputValue(key, value) {
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
  }
}

export default Auth;
