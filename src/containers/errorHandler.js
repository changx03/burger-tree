import React, { Component } from 'react';
import Modal from '../components/UI/Modal';

const errorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = { error: null };
    reqInterceptor;
    resInterceptor;

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      console.log('[errorHandler] componentWillUnmount', this.reqInterceptor, this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render() {
      return (
        <React.Fragment>
          <Modal show={this.state.error} onDismiss={this._onDismiss}>
            <p>{this.state.error ? this.state.error.message : null}</p>
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }

    _onDismiss = () => {
      this.setState({ error: null });
    };
  };
};

export default errorHandler;
