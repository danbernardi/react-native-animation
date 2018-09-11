import React, { Component } from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { View, TouchableHighlight } from 'react-native';
import { object } from 'prop-types';
import styles from './styles';

class Header extends Component {
  constructor (props) {
    super (props);

    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav () {
    this.props.navigation.toggleDrawer();
  }

  render () {
    return (
      <View style={ styles.header }>
        <TouchableHighlight underlayColor={ 'transparent' } onPress={ this.toggleNav }>
          <FontAwesome style={ styles.menu }>{ Icons.bars }</FontAwesome>
        </TouchableHighlight>
      </View>
    );
  }
}

Header.propTypes = {
  navigation: object
};

export default Header;
