import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Animated, TouchableHighlight, Dimensions } from 'react-native';
import styles from './styles';
import AppWrapper from '../../containers/AppWrapper';
import { number, object } from 'prop-types';

class SpringExample extends Component {
  constructor(props) {
    super(props);

    this.setup(props);
  }

  componentWillReceiveProps(newProps) {
    this.setup(newProps);
  }

  setup(props) {
    this.boxCount = props.boxCount;
    this.boxes = {};

    let i;
    for (i = 0; i < this.boxCount; i++) {
      this.boxes[`box${i}Position`] = new Animated.Value(Dimensions.get('window').height * -1);
    }

    if (this.state) {
      this.setState({ ...this.boxes });
    } else {
      this.state = { ...this.boxes };
    }

    this.triggerAnimation = this.triggerAnimation.bind(this);

    this.inSpringConfig = {
      stiffness: props.stiffness,
      damping: props.damping,
      velocity: props.velocity,
      useNativeDriver: true
    };

    this.outSpringConfig = {
      stiffness: props.stiffness * (5 / 4),
      damping: props.damping - 1,
      useNativeDriver: true
    };
  }

  triggerAnimation() {
    Animated.sequence([
      Animated.stagger(40, Object.keys(this.boxes).reverse().map((box) => (
        Animated.spring(this.state[box], { toValue: 0, ...this.inSpringConfig })
      ))),

      Animated.stagger(25, Object.keys(this.boxes).map((box) => (
        Animated.spring(this.state[box], { toValue: Dimensions.get('window').height * -1, ...this.outSpringConfig })
      )))
    ]).start();
  }

  render() {
    return (
      <AppWrapper navigation={ this.props.navigation }>
        <View style={ { flex: 1, width: this.props.windowWidth, backgroundColor: '#6cd4ff' } }>
          <View style={ { flex: 5, backgroundColor: '#94dfff', alignItems: 'center', justifyContent: 'center' } }>
            <View style={ styles.animationContainer }>
              { Object.keys(this.boxes).map((box, index) => (
                <Animated.View
                  key={ index }
                  style={ { transform: [{ translateY: this.state[box] }] } }
                >
                  <View style={ styles.box } />
                </Animated.View>
              )) }
            </View>
          </View>

          <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center', height: 100 } }>
            <TouchableHighlight style={ styles.btn } onPress={ this.triggerAnimation } underlayColor="#326174">
              <Text style={ { color: 'white', fontWeight: 'bold', fontSize: 20 } }>Trigger animation</Text>
            </TouchableHighlight>
          </View>
        </View>
      </AppWrapper>
    );
  }
}

SpringExample.propTypes = {
  windowWidth: number,
  navigation: object,
  stiffness: number,
  damping: number,
  velocity: number,
  boxCount: number
};

const mapStateToProps = state => ['stiffness', 'damping', 'velocity', 'boxCount']
  .reduce((obj, key) => ({
    ...obj,
    [key]: state.configs.getIn(['Stagger / Spring example', key])
  }), {});

export default connect(mapStateToProps)(SpringExample);
