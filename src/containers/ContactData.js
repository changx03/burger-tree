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
        },
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
        },
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
        validation: {
          required: true,
        },
      },
    },
    loading: false,
  };

  componentDidMount() {
    console.log('[ContactData]', this.props);
  }

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

  _updateInputValue(key, value) {
    const newOrderForm = { ...this.state.orderForm };
    const newElement = { ...this.state.orderForm[key] };
    newElement.value = value;
    newOrderForm[key] = newElement;
    this.setState({
      orderForm: newOrderForm,
    });
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
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ loading: false });
        throw err;
      });
  };
}
