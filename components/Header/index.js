import React, { Component } from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Text, View, TouchableHighlight } from 'react-native';
import { object, func, string } from 'prop-types';
import { connect } from 'react-redux';

import { setModal } from '../../store/actions';
import { modalContent } from '../../components/ConfigModal';
import styles from './styles';

class Header extends Component {
  constructor (props) {
    super (props);

    this.toggleNav = this.toggleNav.bind(this);

    this.state = {
      modalVisible: false
    };
  }

  toggleNav () {
    this.props.navigation.toggleDrawer();
  }

  toggleConfig () {
    const { dispatch, navigationState, routes, modal } = this.props;
    const currentRoute = routes[navigationState.getIn(['current', 'key'])];
    const route = currentRoute ? currentRoute.initialRouteParams.title : '';
    dispatch(setModal(modal ? null : route));
  }

  render () {
    const { navigation, navigationState, routes } = this.props;
    const currentRoute = routes[navigationState.getIn(['current', 'key'])];
    const route = currentRoute ? currentRoute.initialRouteParams.title : '';

    return (
      <View style={ styles.header }>
        { modalContent[route]
          ? <TouchableHighlight underlayColor={ 'transparent' } onPress={ () => this.toggleConfig() }>
            <FontAwesome style={ styles.config }>{ Icons.ellipsisV }</FontAwesome>
          </TouchableHighlight>
          : null
        }

        { navigation && <View>
          <Text style={ styles.headerTitle }>
            { route }
          </Text>
        </View> }

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
  routes: object,
  dispatch: func,
  modal: string
};

const mapStateToProps = state => ({
  navigationState: state.navigationState,
  modal: state.modal
});

export default connect(mapStateToProps)(Header);
