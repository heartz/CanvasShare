import React from 'react';
import io from 'socket.io-client';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
const socket = io();

class Controls extends React.Component {
  constructor(props){
    super(props);
    socket.on('clear', (payload) => {   
      console.log('clear');
    });
  }
  onClick() {
      socket.emit('clear');
  }
  render() {
    return (
    <div id="controls">
      <label className="alert alert-success">  Collaborative</label>
      <p><label>Drawing Tools</label></p>
      <RadioButtonGroup name="shipSpeed" defaultSelected="line_button">
      <RadioButton
        value="line_button"
        label="Line"
      />
      <RadioButton
        value="circle_button"
        label="Circle"
      />
      <RadioButton
        value="polygon_button"
        label="Polygon"
      />
      <RadioButton
        value="quare_button"
        label="Square"
      />
      </RadioButtonGroup>
      <Toggle
        label="Fill"
      />
      <RaisedButton label="Clear"
        onClick={this.onClick}
      />
    </div>)
  }
}

export default Controls;