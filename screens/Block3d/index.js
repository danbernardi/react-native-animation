import React, { Component } from 'react';
import { number, object } from 'prop-types';
import {
  View, Animated, Text
} from 'react-native';
import styles from './styles';
import AppWrapper from '../../containers/AppWrapper';

class Block3d extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rotate: new Animated.ValueXY({ x: 0, y: 0 })
    };

    this.handlePanResponderMove = this.handlePanResponderMove.bind(this);
  }

  // ComponentWillMount () {
  //   this._panResponder = PanResponder.create({
  //     onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
  //     onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

  //     onPanResponderGrant: (e, gestureState) => {
  //       clearTimeout(this.timeout);
  //       this.props.disableScroll();

  //       Animated.spring(
  //         this.state.rotateX,
  //         { toValue: 45, friction: 3, tension: 50 }
  //       ).start();
  //     },

  //     // onPanResponderMove: this.handlePanResponderMove,

  //     onPanResponderRelease: (e, gestureState) => {
  //       // this.state.rotate.flattenOffset();
  //       // Animated.spring(
  //       //   this.state.rotate,
  //       //   {
  //       //     toValue: { x: 0, y: 0 },
  //       //     friction: 3,
  //       //     restDisplacementThreshold: 1
  //       //   }
  //       // ).start();

  //       this.timeout = setTimeout(() => {
  //         this.props.enableScroll();
  //       }, 1000);
  //     }
  //   })
  // }

  componentDidMount() {
    const self = this;

    function animationLoop(self) {
      Animated.sequence([
        Animated.timing(this.state.rotate, {
          toValue: { x: 360, y: 360 },
          duration: 5000
        }),
        Animated.timing(this.state.rotate, {
          toValue: { x: 0, y: 0 },
          duration: 5000
        })
      ]).start((event) => {
        if (event.finished) animationLoop(self);
      });
    }

    animationLoop(self);

    // Animated.timing(
    //   this.state.rotate,
    //   {
    //     toValue: { x: 360, y: 360 },
    //     duration: 10000
    //   }
    // ).start();
  }

  // handlePanResponderMove(e, gestureState) {
  //   const { dx, dy } = gestureState;
  //   const y = `${dx}deg`;
  //   const x = `${dy}deg`;
  // }

  render() {
    const { rotate } = this.state;
    // console.log(rotate.x._value);
    // console.log(rotate.y._value);

    const transformStyle = {
      transform: [
        { perspective: 1000 },
        {
          rotateX: rotate.x.interpolate({
            inputRange: [-360, 360],
            outputRange: ['-360deg', '360deg']
          })
        },
        {
          rotateX: rotate.y.interpolate({
            inputRange: [-360, 360],
            outputRange: ['-360deg', '360deg']
          })
        }
      ]
    };

    return (
      <AppWrapper navigation={ this.props.navigation }>
        <View style={ {
          flex: 1,
          backgroundColor: '#fafafa',
          width: this.props.windowWidth,
          alignItems: 'center',
          justifyContent: 'center' } }
        >
          <Animated.View style={ transformStyle }>
            <View style={ styles.blockSide1 }><Text style={ { color: '#FFFFFF' } }>Side1</Text></View>
            <View style={ styles.blockSide2 }><Text style={ { color: '#FFFFFF' } }>Side2</Text></View>
            <View style={ styles.blockTop }><Text style={ { color: '#FFFFFF' } }>Top</Text></View>
            <View style={ styles.blockBottom }><Text style={ { color: '#FFFFFF' } }>Bottom</Text></View>
            <View style={ styles.blockBack }><Text style={ { color: '#FFFFFF' } }>Back</Text></View>
            <View style={ styles.blockFront }><Text style={ { color: '#FFFFFF' } }>Front</Text></View>
          </Animated.View>
        </View>
      </AppWrapper>
    );
  }
}

Block3d.propTypes = {
  windowWidth: number,
  navigation: object
};

export default Block3d;
