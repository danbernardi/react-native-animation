import React from 'react';
import { object } from 'prop-types';
import { TouchableHighlight, Animated } from 'react-native';
import AppWrapper from '../../containers/AppWrapper';

const colors = [
  '#FFFFFF',
  '#0DA6F3',
  '#F8B724',
  '#EE05BA',
  '#000000',
  '#3AD283',
  '#11005E',
  '#FF005D',
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
  }

  triggerSwipe({ nativeEvent }) {
    const coordinates = { x: nativeEvent.locationX, y: nativeEvent.locationY };
    const self = this;
    if (!this.state.animating) {
      this.setState({
        x: coordinates.x,
        y: coordinates.y,
        animating: true
      }, () => {
        Animated.timing(
          self.state.scale,
          { toValue: 20, duration: 500 },
        ).start(() => {
          this.setState({
            scale: new Animated.Value(0),
            opacity: 0,
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
      top: y - diameter / 2,
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
            height: '100%',
            zIndex: 1,
            position: 'relative',
            backgroundColor: color(colorIndex)
          } }
          onPress={ (event) => this.triggerSwipe(event) }
        >
          <Animated.View
            style={ circleStyles }
          />
        </TouchableHighlight>
      </AppWrapper>
    );
  }
}

ColorScape.propTypes = {
  navigation: object
};

export default ColorScape;
