import React, { Component } from 'react';
import { Text, PanResponder, Animated, Dimensions } from 'react-native';
import styles from './styles';

class Item extends Component {
  constructor (props) {
    super(props);

    this.windowWidth = Dimensions.get('window').width;

    this.state = {
      pan: new Animated.ValueXY(),
      height: new Animated.Value(65)
    };
  }

  componentWillMount () {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        clearTimeout(this.timeout);
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: 0 });
        this.state.pan.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: Animated.event(
        [null, { dx: this.state.pan.x, dy: 0 }],
        { listener: (e, gestureState) => {
          // If the xDelta is bigger than the yDelta, disable parent scroll
          if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && this.props.scrollEnabled) {
            if (this.props.disableScroll instanceof Function) this.props.disableScroll();
          }
        } }
      ),

      onPanResponderTerminate: () => {
        // Reset animation in the event another
        // panHandler is triggered while this is animating
        if (this.props.enableScroll instanceof Function) this.props.enableScroll();
        Animated.spring(
          this.state.pan,
          {
            toValue: { x: 0, y: 0 },
            friction: 10
          }
        ).start();
      },

      onPanResponderRelease: (e, gestureState) => {
        const { enableScroll } = this.props;
        this.state.pan.flattenOffset();

        // If xDelta is large enough, animate item out of view
        if (gestureState.dx > 10 || gestureState.dx < -10) {
          let newYValue;
          if (gestureState.dx > 10) newYValue = this.windowWidth;
          if (gestureState.dx < -10) newYValue = -this.windowWidth;

          Animated.stagger(100, [
            Animated.spring(
              this.state.pan,
              {
                toValue: { x: newYValue, y: 0 },
                friction: 10
              },
            ),

            Animated.spring(
              this.state.height,
              {
                toValue: 0,
                friction: 10
              }
            )
          ]).start();
        } else {
          // Otherwise, return to initial position
          Animated.spring(
            this.state.pan,
            {
              toValue: { x: 0, y: 0 },
              friction: 10
            }
          ).start();
        }

        // Re enable parent scroll once panHandler is complete
        if (enableScroll instanceof Function) enableScroll();
      },

      onShouldBlockNativeResponder: () => false
    });
  }

  render () {
    const { title } = this.props;
    const { pan, height } = this.state;

    const transformStyle = { transform: [{ translateX: pan.x }] };
    const heightTransform = { height };

    return (
      <Animated.View style={ [heightTransform] }>
        <Animated.View
          style={ [styles.item, transformStyle] }
          { ...this._panResponder.panHandlers }
        >
          <Text>{ title }</Text>
        </Animated.View>
      </Animated.View>
    );
  }
}

export default Item;
