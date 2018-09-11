import React, { Component } from 'react';
import {
  View, Text, PanResponder, Animated
} from 'react-native';
import styles from './styles';

class ElasticBall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1)
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: (/* evt, gestureState */) => true,
      onMoveShouldSetPanResponderCapture: (/* evt, gestureState */) => true,

      onPanResponderGrant: (/* e, gestureState */) => {
        clearTimeout(this.timeout);
        this.props.disableScroll();
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
        this.state.pan.setValue({ x: 0, y: 0 });

        Animated.spring(
          this.state.scale,
          { toValue: 1.1, friction: 3 },
        ).start();
      },

      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),

      onPanResponderRelease: (/* e, gestureState */) => {
        this.state.pan.flattenOffset();
        Animated.spring(
          this.state.pan,
          {
            toValue: { x: 0, y: 0 },
            friction: 3,
            restDisplacementThreshold: 1
          },
        ).start();

        this.timeout = setTimeout(() => {
          this.props.enableScroll();
        }, 1000);
      }
    });
  }

  render() {
    const { pan, scale } = this.state;
    const rotate = '0deg';
    const [translateX, translateY] = [pan.x, pan.y];
    const transformStyle = {
      transform: [
        { translateX },
        { translateY },
        { rotate },
        { scale }
      ]
    };

    return (
      <View style={ { flex: 1, backgroundColor: '#fafafa', width: this.props.windowWidth } }>
        <View style={ {
          flex: 5, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center'
        } }
        >
          <Text style={ {
            fontSize: 20, color: '#bbb', fontWeight: 'bold', marginBottom: 100
          } }
          >
            Drag & release the block
          </Text>
          <Animated.View
            style={ transformStyle }
            { ...this._panResponder.panHandlers }
          >
            <View style={ styles.ball } />
          </Animated.View>
        </View>
      </View>
    );
  }
}

export default ElasticBall;
