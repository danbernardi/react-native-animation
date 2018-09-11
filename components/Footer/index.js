import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import styles from './styles';
import { withNavigation } from 'react-navigation';
import { object } from 'prop-types';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.routes = props.navigation.dangerouslyGetParent().state.routes;
  }

  nextRoute (routeIndex) {
    const { navigation } = this.props;
    const nextRoute = this.routes[routeIndex + 1];

    navigation.navigate(nextRoute.routeName);
  }

  prevRoute (routeIndex) {
    const { navigation } = this.props;
    const prevRoute = this.routes[routeIndex - 1];

    navigation.navigate(prevRoute.routeName);
  }

  render () {
    const { navigation } = this.props;
    const routeIndex = this.routes.findIndex(rt => navigation.state.routeName === rt.routeName);

    return (
      <View style={ styles.footer }>

        { routeIndex > 0 &&
          <TouchableHighlight style={ { marginRight: 'auto', marginLeft: -25 } } onPress={ () => this.prevRoute(routeIndex) } underlayColor="transparent">
            <View style={ styles.iconContainer }>
              <FontAwesome>{ Icons.caretLeft }</FontAwesome>
              <Text style={ { marginLeft: 10 } }>Previous</Text>
            </View>
          </TouchableHighlight>
        }

        { routeIndex < this.routes.length - 1 &&
          <TouchableHighlight style={ { marginLeft: 'auto', marginRight: -25 } } onPress={ () => this.nextRoute(routeIndex) } underlayColor="transparent">
            <View style={ styles.iconContainer }>
              <Text style={ { marginRight: 10 } }>Next</Text>
              <FontAwesome>{ Icons.caretRight }</FontAwesome>
            </View>
          </TouchableHighlight>
        }
      </View>
    );
  }
}

Footer.propTypes = {
  navigation: object
};

export default withNavigation(Footer);
