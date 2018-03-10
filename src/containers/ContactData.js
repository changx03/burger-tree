import React, { Component } from 'react';
import axios from '../axios-orders';
import Button from '../components/UI/Button';
import Spinner from '../components/UI/Spinner';
import Input from '../components/UI/Input';
import styledClasses from './ContactData.css';

export default class ContactData extends Component {
  state = {
    orderForm: {
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
        },
        valid: false,
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
        valid: false,
      },
    },
    loading: false,
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
          onChange={e => {
            this._updateInputValue(key, e.target.value);
          }}
        />
      );
    });

    let form = (
      <form>
        {formElements}
        <Button btnType="Success" onClick={this._onFormBtnClick}>
          Order
        </Button>
      </form>
    );
    this.state.loading && (form = <Spinner />);
    return (
      <div className={styledClasses.ContactData}>
        <h4>Enter your contact</h4>
        {form}
      </div>
    );
  }

  checkValidity(value, rules) {
    if (!rules || Object.keys(rules).length === 0) {
      return true;  // empty rules. Don't need validation
    }
    let isValid = true;
    const trimmedVal = value.trim();
    if (rules.required) {
      isValid = (trimmedVal !== '');
    }
    if (rules.minLength) {
      isValid = isValid && (trimmedVal.length >= rules.minLength);
    }
    if (rules.maxLength) {
      isValid = isValid && (trimmedVal.length <= rules.maxLength);
    }
    return isValid;
  }

  _updateInputValue(key, value) {
    const newOrderForm = { ...this.state.orderForm };
    const newElement = { ...this.state.orderForm[key] };
    newElement.value = value;
    newElement.valid = this.checkValidity(value, newElement.validation);
    newOrderForm[key] = newElement;
    this.setState({
      orderForm: newOrderForm,
    });
    console.log(key, newElement);
  }

  _onFormBtnClick = e => {
    e.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: parseFloat(this.props.price), // <- this should calculated from server
      customer: {
        name: this.state.orderForm.name.value,
        email: this.state.orderForm.email.value,
        street: this.state.orderForm.street.value,
        postalCode: this.state.orderForm.postalCode.value,
        deliveryMethod: this.state.orderForm.deliveryMethod.value,
      },
      deliverMethod: 'fast',
    };
    axios
      .post('/orders.json', order)
      .then(response => {
        // console.log(response);
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ loading: false });
        throw err;
      });
  };
}
