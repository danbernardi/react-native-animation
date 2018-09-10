import React, { Component } from 'react';
import { Animated, View, PanResponder } from 'react-native';
import styles from './styles';

class Item extends Component {
  constructor (props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY({ x: 0, y: this.props.itemHeight * props.order.indexOf(props.index) }),
      scale: new Animated.Value(1),
      zIndex: new Animated.Value(1),
      isPressed: false
    };
  }

  componentDidUpdate (prevProps) {
    const { index, order, itemHeight } = this.props;
    const { isPressed } = this.state;

    if (order.indexOf(index) !== prevProps.order.indexOf(index) && !isPressed) {
      Animated.spring(
        this.state.pan,
        { toValue: { x: 0, y: itemHeight * order.indexOf(index) }, friction: 7 }
      ).start();
    }
  }

  componentWillMount () {
    const { order, index, handleItemMove, disableScroll, handleItemPress } = this.props;

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (e, gestureState) => {
        clearTimeout(this.timeout);
        disableScroll();
        this.state.pan.setOffset({ x: 0, y: this.state.pan.y._value });
        this.state.pan.setValue({ x: 0, y: 0 });
        handleItemPress(index);

        Animated.parallel([
          Animated.timing(
            this.state.scale,
            { toValue: 1.03, duration: 200 }
          ),
  
          Animated.timing(
            this.state.zIndex,
            { toValue: 2, duration: 0 }
          )
        ]).start(() => this.setState({ isPressed: true }));
      },

      onPanResponderMove: Animated.event(
        [
          null,
          { dx: 0, dy: this.state.pan.y }
        ],
        { listener: handleItemMove }
      ),

      onPanResponderRelease: (e, gestureState) => {
        this.state.pan.flattenOffset();

        Animated.parallel([
          Animated.spring(
            this.state.scale,
            { toValue: 1, friction: 3 }
          ),

          Animated.spring(
            this.state.pan,
            { toValue: { x: 0, y: this.props.itemHeight * this.props.order.indexOf(this.props.index) }, friction: 7 }
          ),
  
          Animated.timing(
            this.state.zIndex,
            { toValue: 1, duration: 0 }
          )
        ]).start(() => this.setState({ isPressed: false }));

        this.timeout = setTimeout(() => {
          this.props.enableScroll();
        }, 1000);
      }
    })
  }

  render () {
    const { pan, scale, zIndex } = this.state;
    const rotate = '0deg';
    const [translateX, translateY] = [pan.x, pan.y];
    const transformStyle = {
      transform: [
        { translateX },
        { translateY },
        { rotate },
        { scale }
      ],
      zIndex
    };

    return (
      <Animated.View
        style={ transformStyle }
        { ...this._panResponder.panHandlers }
      >
        <View style={ styles.item }>{ this.props.children }</View>
      </Animated.View>
    );
  }
}

export default Item;
