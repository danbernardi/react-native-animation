import React, { Component } from 'react';
import Footer from '../../components/Footer';
import { View } from 'react-native';
import { node } from 'prop-types';

class AppWrapper extends Component {
  render () {
    const { children } = this.props;

    return (
      <View style={ { flex: 1 } }>
        { children }
        <Footer />
      </View>
    );
  }
}

AppWrapper.propTypes = {
  children: node
};

export default AppWrapper;
