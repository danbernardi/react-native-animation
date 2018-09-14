# Notes

Track things we learn here (eg, difference discovered between Android and iOS, different phones, animation limitations, etc).

## ColorScape

- On Android, the `scale` property doesn't seem to work as expected. If `scale` is and `Animated.Value(0)`, and it is multiplying a non-zero value, I would expect the size of the value to be `0`, but it is, instead, slightly above the value. (`1` becomes `1.43`).


## PanResponders

- When using a panResponder on an element inside a scrollView, sometimes the parent scrollView will trigger it's drag event, which interupts the pan event and freezes any current animations in place. In order to avoid this, add a reset animation to `onPanResponderTerminate`. This event is fired when another handler is activated during `onPanResponderMove`.

```
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
```
