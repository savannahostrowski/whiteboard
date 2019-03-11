import React, { Component } from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';

class CanvasColorButton extends Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '255',
      g: '255',
      b: '255',
      a: '1',
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    const { color } = this.state;
    this.setState({ displayColorPicker: false });
    console.log(color);
    this.props.setCanvasColor(color);

  };

  handleChange = color => {
    this.setState({ color: color.rgb });
  };

  render() {
    const { color, displayColorPicker } = this.state;
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          top: '50%',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color}/>
        </div>
        {displayColorPicker ? <div style={styles.popover}>
          <div style={styles.cover} onClick={this.handleClose}/>
          <SketchPicker color={color} onChange={this.handleChange}/>
        </div> : null}

      </div>
    );
  }
}

export default CanvasColorButton;