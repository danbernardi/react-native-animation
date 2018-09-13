import React, { Component } from 'react';
import { FlatList, View, Text, PanResponder, Animated, Dimensions, Easing } from 'react-native';
import { number, string, func } from 'prop-types';
import { range } from 'lodash';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import styles from './styles';

class Page extends Component {
  constructor (props) {
    super(props);

    this.items = range(20);

    this.windowHeight = Dimensions.get('window').height;
    this.initialYValue = this.windowHeight / 2;

    const pan = new Animated.ValueXY({ x: 0, y: this.initialYValue });
    this.state = {
      pan,
      progress: pan.y.interpolate({
        inputRange: [0, this.initialYValue],
        outputRange: [0, 1]
      }),
      scrolling: false
    };

    this.scrollToTopHandler = this.scrollToTopHandler.bind(this);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: () => !this.state.scrolling,
      onMoveShouldSetPanResponderCapture: () => !this.state.scrolling,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({ x: 0, y: this.state.pan.y._value });
        this.state.pan.setValue({ x: 0, y: gestureState.dy });
      },

      onPanResponderMove: (e, gestureState) => {
        // console.log(gestureState.dy);

        return Animated.event([
          null, { dx: 0, dy: this.state.pan.y }
        ])(e, gestureState);
      },

      onPanResponderRelease: (e, gestureState) => {
        const { scrolling } = this.state;

        if (!scrolling) {
          this.state.pan.flattenOffset();
          let newYValue = null;
          let scrolling = false;

          if (gestureState.dy > 20) {
            newYValue = this.initialYValue;
            scrolling = false;
          } else if (gestureState.dy < -20) {
            newYValue = 0;
            scrolling = true;
          }

          this.setState({ scrolling });
          // console.log('scrolling');
          if (newYValue !== null) {
            Animated.spring(
              this.state.pan,
              {
                toValue: { x: 0, y: newYValue },
                friction: 8,
                restDisplacementThreshold: 1
              }
            ).start();
          }
        }
      }
    });
  }

  scrollToTopHandler (e) {
    if (e.nativeEvent.contentOffset.y <= 0 && this.state.scrolling) {
      // console.log(this.initialYValue);
      // this.state.pan.flattenOffset();
      this.setState({ scrolling: false });
      Animated.spring(
        this.state.pan,
        {
          toValue: { x: 0, y: this.initialYValue },
          friction: 12,
          restDisplacementThreshold: 1
        }
      ).start();
    }
  }

  render () {
    const { pan, progress, scrolling } = this.state;
    const { index, color, windowWidth } = this.props;

    console.log('scrolling: ' + scrolling)

    const transformStyle = {
      transform: this.state.pan.getTranslateTransform()
    };

    const transformOutStyles = {
      transform: [
        { translateY: pan.y.interpolate({
          inputRange: [0, this.initialYValue],
          outputRange: [-200, 0]
        }) }
      ],
      opacity: progress
    };

    const opacityStyle = {
      opacity: progress
    };

    return (
      <View style={ [styles.container, { backgroundColor: color, width: windowWidth }] }>
        <View style={ {
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          height: this.windowHeight / 2
        } }>
          <Animated.Text
            style={ [{
              fontSize: 50,
              fontWeight: 'bold',
              color: 'white'
            }, transformOutStyles] }>
            { index + 1 }
          </Animated.Text>
        </View>

        <Animated.View
          ref={ el => { this.animatedView = el; } }
          style={ [styles.listContainer, transformStyle] }
          { ...this._panResponder.panHandlers }
        >
          <Animated.View style={ { alignItems: 'center', position: 'absolute', top: -30, width: '100%' } }>
            <FontAwesome style={ styles.scrollIndicator }>
              <Animated.Text style={ opacityStyle }>{ Icons.angleDoubleUp }</Animated.Text>
            </FontAwesome>
          </Animated.View>

          <FlatList
            data={ this.items }
            scrollEnabled={ scrolling }
            onScroll={ this.scrollToTopHandler }
            scrollEventThrottle={ 200 }
            style={ styles.list }
            keyExtractor={ (item, index) => `${index}` }
            renderItem={ (item, index) => (
              <View style={ [styles.item] }>
                <Text>{ `${item}` }</Text>
              </View>
            ) }
          />
        </Animated.View>
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
