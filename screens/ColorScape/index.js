import React from 'react';
import { object } from 'prop-types';
import { View, TouchableHighlight, Animated, Text, Dimensions } from 'react-native';
import AppWrapper from '../../containers/AppWrapper';

const colors = [
  '#FFFFFF',
  '#F8B724',
  '#EE05BA',
  '#3AD283',
  '#FF005D',
  '#0DA6F3',
  '#FF765C'
];

const color = index => colors[index % colors.length];

class ColorScape extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      colorIndex: 0,
      scale: new Animated.Value(0),
      animating: false
    };

    this.windowHeight = Dimensions.get('window').height;
  }

  triggerSwipe({ nativeEvent }) {
    const coordinates = { x: nativeEvent.pageX, y: nativeEvent.pageY };
    const self = this;
    if (!this.state.animating) {
      this.setState({
        x: coordinates.x,
        y: coordinates.y + (this.windowHeight / 2.5),
        animating: true
      }, () => {
        Animated.timing(
          self.state.scale,
          { toValue: 20, duration: 600 },
        ).start(() => {
          this.setState({
            scale: new Animated.Value(0.01), // See Notes.md for reasoning
            colorIndex: this.state.colorIndex + 1,
            animating: false
          });
        });
      });
    }
  }

  render() {
    const { colorIndex, scale, x, y } = this.state;

    const diameter = 100;
    const circleStyles = {
      backgroundColor: color(colorIndex + 1),
      width: diameter,
      height: diameter,
      borderRadius: diameter / 2,
      position: 'absolute',
      zIndex: 1,
      left: x - diameter / 2,
      top: y - diameter / 1.25,
      transform: [
        { scale }
      ]
    };

    return (
      <AppWrapper navigation={ this.props.navigation }>
        <TouchableHighlight
          underlayColor={ color(colorIndex) }
          style={ {
            flex: 1,
            width: '100%',
            height: this.windowHeight * 2,
            zIndex: 1,
            position: 'absolute',
            top: -this.windowHeight / 2,
            backgroundColor: color(colorIndex)
          } }
          onPress={ (event) => this.triggerSwipe(event) }
        >
          <Animated.View
            style={ circleStyles }
          />
        </TouchableHighlight>

        <View pointerEvents="none" style={ { zIndex: 5, flex: 1, alignItems: 'center', justifyContent: 'center' } }>
          <Text style={ { color: 'rgba(0, 0, 0, 0.4)', fontSize: 20, fontWeight: 'bold' } }>Tap on the screen</Text>
        </View>
      </AppWrapper>
    );
  }
}

ColorScape.propTypes = {
  navigation: object
};

export default ColorScape;
