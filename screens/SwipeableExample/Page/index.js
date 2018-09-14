import React, { Component } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { number } from 'prop-types';
import { range } from 'lodash';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Item from './Item';
import styles from './styles';

class Page extends Component {
  constructor (props) {
    super(props);

    this.items = range(20);
    this.windowHeight = Dimensions.get('window').height;
    this.scrollProgress = new Animated.Value(0);

    this.state = {
      scrollEnabled: true,
      scrolling: false
    };
  }

  render () {
    const { index, windowWidth } = this.props;
    const { scrollEnabled, scrolling } = this.state;

    // Map scroll state to opacity state
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
      <View style={ [styles.container, { width: windowWidth }] }>
        <Animated.ScrollView
          ref={ el => { this.scrollView = el; } }
          scrollEnabled={ scrollEnabled }
          style={ styles.scrollContainer }
          onScrollBeginDrag={ () => this.setState({ scrolling: true }) }
          onMomentumScrollEnd={ () => this.setState({ scrolling: false }) }
          scrollEventThrottle={ 16 }
          onScroll={ Animated.event([
            { nativeEvent: { contentOffset: { y: this.scrollProgress } } }
          ], { useNativeDriver: true }) }
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
            style={ styles.listContainer }
          >
            <Animated.View style={ { alignItems: 'center', width: '100%' } }>
              <FontAwesome style={ styles.scrollIndicator }>
                <Animated.Text style={ opacityStyle }>{ Icons.angleDoubleUp }</Animated.Text>
              </FontAwesome>
            </Animated.View>

            { this.items.map((item, index) => (
              <Item
                key={ index }
                title={ `Item-${item}` }
                enableScroll={ () => this.setState({ scrollEnabled: true }) }
                disableScroll={ () => this.setState({ scrollEnabled: false }) }
                scrollEnabled={ scrollEnabled }
                scrolling={ scrolling }
              />
            )) }
          </Animated.View>
        </Animated.ScrollView>
      </View>
    );
  }
}

Page.propTypes = {
  index: number,
  windowWidth: number
};

export default Page;
