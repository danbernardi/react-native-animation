import React, { Component } from 'react';
import { SafeAreaView, View, Text, Dimensions } from 'react-native';
import { Font } from 'expo';
import { createDrawerNavigator, NavigationEvents } from 'react-navigation';
import SpringExample from './screens/SpringExample';
import ElasticBall from './screens/ElasticBall';
import ListItems from './screens/ListItems';
import ColorScape from './screens/ColorScape';
import Swipeable from './screens/SwipeableExample';
import Header from './components/Header';

const routes = {
  Swipeable: {
    screen: Swipeable,
    initialRouteParams: { title: 'Swipeable Example' },
    navigationOptions: () => ({
      title: 'Swipeable Example'
    })
  },
  ListItems: {
    screen: ListItems,
    navigationOptions: () => ({
      title: 'Sortable List UI Example'
    })
  },
  SpringExample: {
    screen: SpringExample,
    navigationOptions: () => ({
      title: 'Stagger / Spring example'
    })
  },
  ElasticBall: {
    screen: ElasticBall,
    navigationOptions: () => ({
      title: 'Elastic ball / Event example'
    })
  },
  ColorScape: {
    screen: ColorScape,
    navigationOptions: () => ({
      title: 'Color manipulation example'
    })
  }
};

const Router = createDrawerNavigator(routes, {
  initialRouteName: 'Swipeable',
  // headerMode: 'none',
  drawerPosition: 'right',
  useNativeAnimations: false,
  drawerLockMode: 'locked-closed'
});

class App extends Component {
  constructor(props) {
    super(props);

    this.windowWidth = Dimensions.get('window').width;

    this.state = {
      loading: true,
      navigation: null
    };
  }

  componentDidUpdate (prevProps, prevState) {
    const { navigation } = this.state;
    if (navigation && !prevState.nagivation) {
      navigation.addListener('didFocus', payload => console.log(payload));
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      FontAwesome: require('./assets/fonts/fontawesome-webfont.ttf')
    });

    this.setState({ loading: false });
  }

  render () {
    const { loading, navigation } = this.state;

    return (
      loading
        ? <View style={ {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        } }><Text>Loading...</Text>
        </View>
        : <SafeAreaView style={ { flex: 1 } }>
          <Header navigation={ navigation } />
          <Router
            ref={ navRef => (navRef && !navigation) && this.setState({ navigation: navRef._navigation }) }
            routes={ routes }
            style={ { zIndex: 1 } }
          />
        </SafeAreaView>
    );
  }
}

export default App;
