import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../axios-orders';
import Order from './Order';
import errorHandler from './errorHandler';
import Spinner from '../components/UI/Spinner';

class Orders extends Component {
  // componentDidMount() {
  //   axios.get('/orders.json').then(res => {
  //     const orders = Object.keys(res.data).map(key => ({...res.data[key], id: key}));
  //     // console.log("[Orders]", orders);
  //     this.setState({ loading: false, orders: orders });
  //   }).catch(err => {
  //     this.setState({ loading: false });
  //   });
  // }

  render() {
    return (
      <React.Fragment>
        {this.props.loading ? <Spinner /> 
          : this.props.orders.map(order => <Order key={order.id} {...order} />)
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders,
  loading: state.loading,
});

export default connect(mapStateToProps)(errorHandler(Orders, axios));
