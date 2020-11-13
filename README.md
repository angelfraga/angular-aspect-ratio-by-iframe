# angular-aspect-ratio-by-iframe

This is an example of using an iframe in order to have a **fully responsive(*)** aspect-ratio element which imitates the tipical displayed video area.

This mechanism is very helpful for:
 - if we have to draw over a video element. Since the *displayed video area* is already calculated,
  the video element will always fit with the aspect ratio. Or in other words, our canvas and *displayed video area* sizes will be identical*.
 - if we have to keep an element always visible taking the maximun of the remaining space vertically and horizontally fitting with the given aspect ratio.

![center-center-height-overflow][center-center-height-overflow]

[Demo on StackBlitz ⚡️](https://angular-aspect-ratio-by-iframe.stackblitz.io/)

Note: resize the window in both directions: vertically and horizontally.




[center-center-height-overflow]: https://github.com/angelfraga/angular-aspect-ratio-by-iframe/blob/master/docs/center-center-height-oveflow.png?raw=true "center-center-height-overflow"
