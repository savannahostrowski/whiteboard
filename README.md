## Whiteboard Web App

This is a cross-platform whiteboard web + Android app created using [React](https://reactjs.org/), [Immutable.js](https://github.com/immutable-js/immutable-js/), and [Apache Cordova](https://cordova.apache.org/). It allows you to:

- Draw lines on a canvas
- Change the canvas color using the [React Color picker](https://casesandberg.github.io/react-color/#examples)
- Erase the canvas

The data persists across browser sessions by leveraging local storage.

Resources:
[Porting Create-React-App to Cordova](https://github.com/johnkmzhou/cordova-create-react-app)
[Drawing with React and Immutable.js](https://medium.com/@colesayershapiro/drawing-in-react-ed5c0a630178)

To run this app in the browser, use `node scripts/start.js`. Note that this app was ejected from CRA to accommodate Cordova.
To run this app on an Android device using the APK, plug in your device and use `cordova run android --device` in the terminal.


