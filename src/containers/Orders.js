import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../axios-orders';
import Order from './Order';
import errorHandler from './errorHandler';
import Spinner from '../components/UI/Spinner';
import { actions } from '../store';

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

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
  orders: state.order.orders,
  loading: state.order.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(actions.fetchOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Orders, axios));
