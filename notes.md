# Notes

Track things we learn here (eg, difference discovered between Android and iOS, different phones, animation limitations, etc).

## ColorScape

- On Android, the `scale` property doesn't seem to work as expected. If `scale` is and `Animated.Value(0)`, and it is multiplying a non-zero value, I would expect the size of the value to be `0`, but it is, instead, slightly above the value. (`1` becomes `1.43`).
