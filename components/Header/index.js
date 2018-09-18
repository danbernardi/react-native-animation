import React, { Component } from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Text, View, TouchableHighlight } from 'react-native';
import { object } from 'prop-types';
import styles from './styles';
import { connect } from 'react-redux';

class Header extends Component {
  constructor (props) {
    super (props);

    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav () {
    this.props.navigation.toggleDrawer();
  }

  render () {
    const { navigation, navigationState, routes } = this.props;
    const currentRoute = routes[navigationState.getIn(['current', 'key'])];

    return (
      <View style={ styles.header }>
        { navigation && <Text style={ styles.headerTitle }>
          { currentRoute ? currentRoute.initialRouteParams.title : '' }
        </Text> }

        <TouchableHighlight underlayColor={ 'transparent' } onPress={ this.toggleNav }>
          <FontAwesome style={ styles.menu }>{ Icons.bars }</FontAwesome>
        </TouchableHighlight>
      </View>
    );
  }
}

Header.propTypes = {
  navigation: object,
  navigationState: object,
  routes: object
};

const mapStateToProps = state => ({
  navigationState: state.navigationState
});

export default connect(mapStateToProps)(Header);
