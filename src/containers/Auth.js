import React, { Component } from 'react';
import { Button, Input } from '../components/UI';
import styleClasses from './Auth.css';

const loginForm = {
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Choose your login email',
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
}

class Auth extends Component {
  state = {
    loginForm,
    isValid: false,
  }

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
  }
}

export default Auth;
