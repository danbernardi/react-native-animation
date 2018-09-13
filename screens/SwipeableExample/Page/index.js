import React, { Component } from 'react';
import { ScrollView, View, Text, PanResponder, Animated, Dimensions, Easing } from 'react-native';
import { number, string, func } from 'prop-types';
import { range } from 'lodash';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import styles from './styles';

class Page extends Component {
  constructor (props) {
    super(props);

    this.items = range(20);
    this.windowHeight = Dimensions.get('window').height;
    this.scrollProgress = new Animated.Value(0);
  }

  render () {
    const { index, color, windowWidth } = this.props;

    const opacityProgress = this.scrollProgress.interpolate({
      inputRange: [100, 500],
      outputRange: [1, 0]
    });

    const transformOutStyles = {
      transform: [
        { translateY: this.scrollProgress.interpolate({
          inputRange: [0, 500],
          outputRange: [0, 200]
        }) }
      ],
      opacity: opacityProgress
    };

    const opacityStyle = {
      opacity: opacityProgress
    };

    return (
      <View style={ [styles.container, { backgroundColor: color, width: windowWidth }] }>
        <Animated.ScrollView
          ref={ el => { this.scrollView = el; } }
          style={ styles.scrollContainer }
          onScroll={ Animated.event([
            { nativeEvent: { contentOffset: { y: this.scrollProgress } } }
          ]) }
          scrollEventThrottle={ 16 }
        >
          <View style={ {
            alignItems: 'center',
            justifyContent: 'center',
            height: this.windowHeight / 1.75
          } }>
            <Animated.Text
              style={ [{
                fontSize: 50,
                fontWeight: 'bold',
                color: 'white',
                marginTop: 70
              }, transformOutStyles] }>
              { index + 1 }
            </Animated.Text>
          </View>

          <Animated.View
            ref={ el => { this.animatedView = el; } }
            style={ styles.listContainer }
          >
            <Animated.View style={ { alignItems: 'center', width: '100%' } }>
              <FontAwesome style={ styles.scrollIndicator }>
                <Animated.Text style={ opacityStyle }>{ Icons.angleDoubleUp }</Animated.Text>
              </FontAwesome>
            </Animated.View>

            { this.items.map((item, index) => (
              <View key={ index } style={ styles.item }>
                <Text>{ `Item ${index + 1}` }</Text>
              </View>
            )) }
          </Animated.View>
        </Animated.ScrollView>
      </View>
    );
  }
}

Page.propTypes = {
  index: number,
  color: string,
  windowWidth: number,
  disableScroll: func,
  enableScroll: func
};

export default Page;
