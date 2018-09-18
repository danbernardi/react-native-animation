import React, { Component } from 'react';
import Footer from '../../components/Footer';
import { View } from 'react-native';
import { node, func } from 'prop-types';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { updateNavigationState } from '../../store/actions';

class AppWrapper extends Component {
  render () {
    const { children, dispatch } = this.props;

    return (
      <View style={ { flex: 1 } }>
        <NavigationEvents
          onWillFocus={ payload => dispatch(updateNavigationState(payload)) }
        />
        { children }
        <Footer />
      </View>
    );
  }
}

AppWrapper.propTypes = {
  children: node,
  dispatch: func
};

export default connect()(AppWrapper);
