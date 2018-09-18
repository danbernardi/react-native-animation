import React, { Component } from 'react';
import { SafeAreaView, View, Text, Dimensions } from 'react-native';
import { Font } from 'expo';
import { createDrawerNavigator } from 'react-navigation';
import SpringExample from './screens/SpringExample';
import ElasticBall from './screens/ElasticBall';
import ListItems from './screens/ListItems';
import ColorScape from './screens/ColorScape';
import Swipeable from './screens/SwipeableExample';
import Header from './components/Header';
import { Provider } from 'react-redux';
import store from './store';

const routes = {};
[
  { screen: Swipeable, title: 'Swipeable Example' },
  { screen: ListItems, title: 'Sortable List UI Example' },
  { screen: SpringExample, title: 'Stagger / Spring example' },
  { screen: ElasticBall, title: 'Elastic ball / Event example' },
  { screen: ColorScape, title: 'Color manipulation example' }
].forEach((route) => {
  routes[route.screen.displayName] = {
    screen: route.screen,
    initialRouteParams: { title: route.title },
    navigationOptions: () => ({ title: route.title })
  };
});

const Router = createDrawerNavigator(routes, {
  initialRouteName: 'Swipeable',
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

  async componentDidMount() {
    await Font.loadAsync({
      FontAwesome: require('./assets/fonts/fontawesome-webfont.ttf')
    });

    this.setState({ loading: false });
  }

  render () {
    const { loading, navigation } = this.state;

    return (
      <Provider store={ store }>
        { loading
          ? <View style={ {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          } }><Text>Loading...</Text>
          </View>
          : <SafeAreaView style={ { flex: 1 } }>
            <Header navigation={ navigation } routes={ routes } />
            <Router
              ref={ navRef => (navRef && !navigation) && this.setState({ navigation: navRef._navigation }) }
              routes={ routes }
              style={ { zIndex: 1 } }
            />
          </SafeAreaView>
        }
      </Provider>
    );
  }
}

export default App;
