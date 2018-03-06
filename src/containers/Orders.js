import React, { Component } from 'react';
import axios from '../axios-orders';
import Order from './Order';
import errorHandler from './errorHandler';
import Spinner from '../components/UI/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios.get('/orders.json').then(res => {
      const orders = Object.keys(res.data).map(key => ({...res.data[key], id: key}));
      console.log("[Orders]", orders);
      this.setState({ loading: false, orders: orders });
    }).catch(err => {
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loading ? <Spinner /> 
          : this.state.orders.map(order => <Order key={order.id} {...order} />)
        }
      </React.Fragment>
    );
  }
}

export default errorHandler(Orders, axios);
