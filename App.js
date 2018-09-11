import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import Home from './screens/Home';
import SpringExample from './screens/SpringExample';
import ElasticBall from './screens/ElasticBall';
import ListItems from './screens/ListItems';

class App extends Component {
  constructor(props) {
    super(props);

    this.windowWidth = Dimensions.get('window').width;

    this.routes = [
      // Block3d,
      ListItems,
      Home,
      SpringExample,
      ElasticBall
    ];

    this.state = {
      scrollEnabled: true
    };
  }

  render() {
    const { scrollEnabled } = this.state;

    return (
      <View style={ { flex: 1 } }>
        <ScrollView
          style={ { flex: 1, width: this.windowWidth } }
          horizontal={ true }
          showHorizontalScrollIndicator={ true }
          pagingEnabled={ true }
          decelerationRate="fast"
          scrollEnabled={ scrollEnabled }
        >
          { this.routes.map((component, index) => (
            React.createElement(component, {
              key: index,
              enableScroll: () => this.setState({ scrollEnabled: true }),
              disableScroll: () => this.setState({ scrollEnabled: false }),
              windowWidth: this.windowWidth
            })
          )) }
        </ScrollView>
      </View>
    );
  }
}

export default App;
