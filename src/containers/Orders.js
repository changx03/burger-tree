import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../axios-orders';
import Order from './Order';
import errorHandler from './errorHandler';
import { Spinner } from '../components/UI';
import { actions } from '../store';

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId);
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
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Orders, axios));
