import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="https://github.com/PPbra/lazada_store_inspect">Bazzil Team</a> &copy; 2019 creativeLabs.</span>
        <span className="ml-auto">Powered by <a href="https://github.com/PPbra/lazada_store_inspect">Bazzill</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
