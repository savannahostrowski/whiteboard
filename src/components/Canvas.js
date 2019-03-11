import React, { Component } from 'react';
import Immutable from 'immutable';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CanvasColorButton from './CanvasColorButton';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

class Canvas extends Component {
  state = {
    lines: new Immutable.List(),
    isDrawing: false,
    canvasColor: JSON.parse(localStorage.getItem('canvasColor')) || {
      r: '255',
      g: '255',
      b: '255',
      a: '1',
    },
  };

  componentDidMount() {
    document.addEventListener('mouseup', this.handleMouseUp);
    this.retrieveDataFromLocalStorage();
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  retrieveDataFromLocalStorage = () => {
    if (localStorage.getItem('lines') !== 'undefined' && localStorage.getItem('lines')) {
      const linesFromStorage = JSON.parse(localStorage.getItem('lines'));
      let lines = [];
      for (let idx = 0; idx < linesFromStorage.length; idx++) {
        const line = linesFromStorage[idx];
        const newLineWithImmutablePoints = [];

        for (let jdx = 0; jdx < line.length; jdx++) {
          const point = line[jdx];
          const immutablePoint = new Immutable.Map({
            x: point['x'],
            y: point['y']
          });

          newLineWithImmutablePoints.push(immutablePoint);

        }
        const immutableLine = new Immutable.List(newLineWithImmutablePoints);
        lines.push(immutableLine);
      }

      this.setState({ lines: new Immutable.List(lines) });
    }
  };

  saveLinesToLocalStorage = () => {
    const { lines } = this.state;
    localStorage.setItem('lines', JSON.stringify(lines));
  };

  handleMouseMove = mouseEvent => {
    if (!this.state.isDrawing) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState(prevState => ({
      lines: prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point))
    }), () => this.saveLinesToLocalStorage());
  };

  handleMouseUp = () => {
    this.setState({ isDrawing: false });
  };

  handleMouseDown = mouseEvent => {
    if (mouseEvent.button !== 0) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState(prevState => ({
      lines: prevState.lines.push(new Immutable.List([point])),
      isDrawing: true
    }), () => this.saveLinesToLocalStorage());
  };

  relativeCoordinatesForEvent = mouseEvent => {
    const boundingRect = this.refs.canvas.getBoundingClientRect();
    return new Immutable.Map({
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top,
    });
  };

  eraseCanvas = () => {
    this.setState({ lines: new Immutable.List() }, () => {
      localStorage.removeItem('lines');
    });
  };

  setCanvasColor = dataFromColorButton => {
    this.setState({ canvasColor: dataFromColorButton },
      () => localStorage.setItem('canvasColor', JSON.stringify(dataFromColorButton)));
  };

  render() {
    const { lines, canvasColor } = this.state;
    const { classes } = this.props;
    return (
      <div
        className="canvas"
        ref="canvas"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        style={{ backgroundColor: `rgba(${canvasColor.r}, ${canvasColor.g}, ${canvasColor.b}, ${canvasColor.a})` }}
      >

        <Drawing lines={lines}/>
        <div>
          <Button variant="outlined" className={classes.button} onClick={this.eraseCanvas}
                  style={{ display: 'inline', float: 'left' }}>
            Erase Lines
          </Button>
          <div className="colorButton">
            <p className="label">Canvas Color</p>
            <CanvasColorButton setCanvasColor={this.setCanvasColor} colorFromStorage={canvasColor} className="colorPicker"/>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Canvas);


const Drawing = ({ lines }) => {
  return (
    <svg className="drawing">
      {lines.map((line, index) => (
        <DrawingLine key={index} line={line}/>
      ))}
    </svg>
  );
};

const DrawingLine = ({ line }) => {
  const pathData = 'M ' +
    line.map(point => {
      return `${point.get('x')} ${point.get('y')}`;
    }).join(' L ');

  return <path className="path" d={pathData}/>;
};