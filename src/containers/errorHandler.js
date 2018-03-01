import React, { Component } from 'react';
import Modal from '../components/UI/Modal/Modal';

const errorHandler = (WrappedComponent, axios ) => {
  return class extends Component {
    state = { error: null };

    componentWillMount() {
      axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });
    }

    render() {
      return (
        <React.Fragment>
          <Modal 
            show={this.state.error}
            onDismiss={this._onDismiss}
          >
            <p>{this.state.error ? this.state.error.message : null}</p>
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }

    _onDismiss = () => {
      this.setState({ error: null });
    }
  }
};

export default errorHandler;
