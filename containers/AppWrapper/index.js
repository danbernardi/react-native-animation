import React, { Component } from 'react';
import Footer from '../../components/Footer';
import { SafeAreaView } from 'react-native';

class AppWrapper extends Component {
  render () {
    const { navigation, children } = this.props;

    return (
      <SafeAreaView style={ { flex: 1, backgroundColor: '#FFFFFF' } }>
        { children }
        <Footer />
      </SafeAreaView>
    );
  }
}

export default AppWrapper;
