import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../axios-orders';
import { Button, Input, Spinner } from '../components/UI';
import styledClasses from './ContactData.css';
import withErrorHandler from './errorHandler';
import { actions } from '../store';

const orderForm = {
  name: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Your name',
    },
    value: '',
    validation: {
      required: true,
      minLength: 4,
    },
    valid: false,
    isTouched: false,
  },
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Your email',
    },
    value: '',
    validation: {
      required: true,
    },
    valid: false,
    isTouched: false,
  },
  street: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Streen name',
    },
    value: '',
    validation: {
      required: true,
    },
    valid: false,
    isTouched: false,
  },
  postalCode: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Postal code',
    },
    value: '',
    validation: {
      required: true,
      minLength: 4,
      maxLength: 6,
      type: 'number',
    },
    valid: false,
    isTouched: false,
  },
  deliveryMethod: {
    elementType: 'select',
    elementConfig: {
      options: [
        { value: 'fastest', displayValue: 'Fastest' },
        { value: 'normal', displayValue: 'Normal' },
      ],
    },
    value: 'fastest',
    valid: true,
    isTouched: false,
  },
};

class ContactData extends Component {
  state = {
    orderForm,
    isFormValid: false,
  };

  render() {
    const formElements = Object.keys(this.state.orderForm).map(key => {
      const formElement = this.state.orderForm[key];
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

    let form = (
      <form>
        {formElements}
        <Button
          btnType="Success"
          onClick={this._onFormBtnClick}
          disabled={!this.state.isFormValid}
        >
          Order
        </Button>
      </form>
    );
    this.props.loading && (form = <Spinner />);
    return (
      <div className={styledClasses.ContactData}>
        <h4>Enter your contact</h4>
        {form}
      </div>
    );
  }

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
      isValid = isValid && pattern.test(trimmedVal)
    }
    return isValid;
  }

  _updateInputValue(key, value) {
    const newOrderForm = { ...this.state.orderForm };
    const newElement = { ...this.state.orderForm[key] };
    newElement.value = value;
    newElement.valid = this._checkValidity(value, newElement.validation);
    newElement.isTouched = true;
    newOrderForm[key] = newElement;

    // update form validation
    const isFormValid = Object.values(newOrderForm)
      .map(element => element.valid)
      .reduce((acc, cur) => acc && cur);

    this.setState({
      orderForm: newOrderForm,
      isFormValid: isFormValid,
    });
  }

  _onFormBtnClick = () => {
    const orderData = {
      ingredients: this.props.ingredients,
      price: parseFloat(this.props.price), // <- this should calculated from server
      customer: {
        userId: this.props.userId,
        name: this.state.orderForm.name.value,
        email: this.state.orderForm.email.value,
        street: this.state.orderForm.street.value,
        postalCode: this.state.orderForm.postalCode.value,
        deliveryMethod: this.state.orderForm.deliveryMethod.value,
      },
      deliverMethod: this.state.orderForm.deliveryMethod.value,
    };
    this.props.onOrderBurger(orderData, this.props.token);
  };
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(ContactData, axios)
);
