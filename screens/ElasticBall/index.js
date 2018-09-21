import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View, Text, PanResponder, Animated
} from 'react-native';
import styles from './styles';
import AppWrapper from '../../containers/AppWrapper';
import { object, number } from 'prop-types';

class ElasticBall extends Component {
  constructor (props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1)
    };
  }

  componentWillMount() {
    this.setPanResponder(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setPanResponder(newProps);
  }

  setPanResponder(props) {
    const { friction, expandSize } = props;
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: (/* evt, gestureState */) => true,
      onMoveShouldSetPanResponderCapture: (/* evt, gestureState */) => true,

      onPanResponderGrant: (/* e, gestureState */) => {
        clearTimeout(this.timeout);
        if (this.props.disableScroll instanceof Function) this.props.disableScroll();
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
        this.state.pan.setValue({ x: 0, y: 0 });

        Animated.spring(
          this.state.scale,
          { toValue: expandSize, friction },
        ).start();
      },

      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),

      onPanResponderRelease: (/* e, gestureState */) => {
        this.state.pan.flattenOffset();
        Animated.parallel([
          Animated.spring(
            this.state.pan,
            {
              toValue: { x: 0, y: 0 },
              friction,
              restDisplacementThreshold: 1
            },
          ),

          Animated.spring(
            this.state.scale,
            {
              toValue: 1,
              friction,
              restDisplacementThreshold: 1
            }
          )
        ]).start();

        this.timeout = setTimeout(() => {
          if (this.props.enableScroll instanceof Function) this.props.enableScroll();
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
      <AppWrapper navigation={ this.props.navigation }>
        <View style={ { flex: 1, backgroundColor: '#fafafa', width: this.props.windowWidth } }>
          <View style={ { flex: 5, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' } }>
            <Text style={ { fontSize: 20, color: '#bbb', fontWeight: 'bold', marginBottom: 100 } }>Drag & release the block</Text>
            <Animated.View
              style={ transformStyle }
              { ...this._panResponder.panHandlers }
            >
              <View style={ styles.ball } />
            </Animated.View>
          </View>
        </View>
      </AppWrapper>
    );
  }
}

ElasticBall.propTypes = {
  navigation: object,
  friction: number,
  expandSize: number
};

const mapStateToProps = state => ({
  friction: state.configs.getIn(['Elastic ball / Event example', 'friction']),
  expandSize: state.configs.getIn(['Elastic ball / Event example', 'expandSize'])
});

export default connect(mapStateToProps)(ElasticBall);
