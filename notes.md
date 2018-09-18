# Notes

Track things we learn here (eg, difference discovered between Android and iOS, different phones, animation limitations, etc).

## ColorScape

- On Android, the `scale` property doesn't seem to work as expected. If `scale` is and `Animated.Value(0)`, and it is multiplying a non-zero value, I would expect the size of the value to be `0`, but it is, instead, slightly above the value. (`1` becomes `1.43`).
- Android has issues setting values to zero, which "strips it of its characteristics". This was blocking resetting of the scale of the expanded circle, which in turn was then overlaying the whole page, creating a color-reset visual. The solution, strangely, is to set the value to `0.01` instead of `0`. See [this SO discussion](https://stackoverflow.com/questions/47278781/react-native-animation-not-working-properly-on-android).

## PanResponders

- When using a panResponder on an element inside a scrollView, sometimes the parent scrollView will trigger it's drag event, which interrupts the pan event and freezes any current animations in place. In order to avoid this, add a reset animation to `onPanResponderTerminate`. This event is fired when another handler is activated during `onPanResponderMove`.

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
