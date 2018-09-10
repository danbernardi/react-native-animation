import React, { Component } from 'react';
import { View, Text, PanResponder, Animated } from 'react-native';
import Item from './Item';
import { range } from 'lodash';
import styles from './styles';

const colors = ['blue', 'red', 'teal', 'green', 'pink'];

function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];

  _arr.splice(from, 1);
  _arr.splice(to, 0, val);

  return _arr;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

class ListItems extends Component {
  constructor (props) {
    super(props);

    // Generate five sequential, labeled items
    this.items = range(5).map((el, ind) => `Item ${ind}`);

    this.itemHeight = 65;

    this.state = {
      orderOfLastPressed: 0,
      order: range(this.items.length)
    }

    this.handleItemMove = this.handleItemMove.bind(this);
    this.handleItemPress = this.handleItemPress.bind(this);
  }

  // When an item is clicked for movement, record its starting
  // position and index
  handleItemPress = (posIndex) => {
    this.setState({
      orderOfLastPressed: this.state.order.indexOf(posIndex),
      indexOfLastPressed: posIndex
    });
  };

  handleItemMove = (event, gestureState) => {
    const { order, orderOfLastPressed, indexOfLastPressed } = this.state;

    const mouseY = gestureState.dy + (orderOfLastPressed * this.itemHeight);

    // Ensure that the current row found is within the number of items
    const currentRow = clamp(Math.round(mouseY / this.itemHeight), 0, this.items.length);

    // If the item is hovering over a different slot from where it started
    // Reshuffle the items
    if (currentRow !== orderOfLastPressed) {
      let newOrder = order.slice();
      // Calculate the new order based on where the item is now, not where it was
      newOrder = reinsert(newOrder, order.indexOf(indexOfLastPressed), currentRow);
      this.setState({ order: newOrder });
    }
  };

  render () {
    const { order } = this.state;
    const { enableScroll, disableScroll } = this.props;

    return (
      <View style={ { flex: 1, width: this.props.windowWidth, backgroundColor: '#6cd4ff', alignItems: 'center', justifyContent: 'center' } }>

        <View style={ styles.listContainer }>
          { this.items.map((item, index) => (
            <Item
              order={ order }
              enableScroll={ enableScroll }
              disableScroll={ disableScroll }
              key={ index }
              index={ index }
              itemHeight={ this.itemHeight }
              handleItemMove={ this.handleItemMove }
              handleItemPress={ this.handleItemPress }
            ><Text style={{ color: colors[index] }}>{ `${item} - Order ${order.indexOf(index)}` }</Text></Item>
          )) }
        </View>
      </View>
    );
  }
}

export default ListItems;
