import React, { Component } from 'react';
import { number, func } from 'prop-types';
import { View, Text } from 'react-native';
import { range, isEqual } from 'lodash';

import Item from './Item';
import styles from './styles';

const colors = ['blue', 'red', 'teal', 'green', 'pink'];

// Returns a new array, resorted based on the insertion
export function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];

  _arr.splice(from, 1);
  _arr.splice(to, 0, val);

  return _arr;
}

// Returns n, if it falls within min and max
// or the min or max that it exceeded
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
    };

    this.handleItemMove = this.handleItemMove.bind(this);
    this.handleItemPress = this.handleItemPress.bind(this);
  }

  // When an item is clicked for movement, record its starting
  // position and index
  handleItemPress (posIndex) {
    this.setState({
      orderOfLastPressed: this.state.order.indexOf(posIndex),
      indexOfLastPressed: posIndex
    });
  }

  handleItemMove (event, gestureState) {
    const { order, orderOfLastPressed, indexOfLastPressed } = this.state;

    const mouseY = gestureState.dy + (orderOfLastPressed * this.itemHeight);

    // Ensure that the current row found is within the number of items
    const currentRow = clamp(Math.round(mouseY / this.itemHeight), 0, this.items.length);

    let newOrder = order.slice();

    // Calculate the new order based on where the item is now, not where it was
    newOrder = reinsert(newOrder, order.indexOf(indexOfLastPressed), currentRow);

    // Only update state when order changes
    if (!isEqual(newOrder, order)) {
      this.setState({ order: newOrder });
    }
  }

  render () {
    const { order } = this.state;
    const { enableScroll, disableScroll } = this.props;

    return (
      <View
        style={ {
          flex: 1,
          width: this.props.windowWidth,
          backgroundColor: '#6cd4ff',
          alignItems: 'center',
          justifyContent: 'center'
        } }>

        <View style={ [styles.listContainer, { height: this.items.length * this.itemHeight }] }>
          {
            this.items.map((item, index) => (
              <Item
                order={ order.indexOf(index) }
                enableScroll={ enableScroll }
                disableScroll={ disableScroll }
                key={ index }
                index={ index }
                itemHeight={ this.itemHeight }
                handleItemMove={ this.handleItemMove }
                handleItemPress={ this.handleItemPress }
              >
                <Text style={ { color: colors[index] } }>
                  { `${item} - Order ${order.indexOf(index)}` }
                </Text>
              </Item>
            ))
          }
        </View>
      </View>
    );
  }
}

ListItems.propTypes = {
  windowWidth: number,
  enableScroll: func,
  disableScroll: func
};

export default ListItems;
