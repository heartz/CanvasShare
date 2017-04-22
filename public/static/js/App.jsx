import React from 'react';
import Controls from './controls.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import '../css/index.css';

injectTapEventPlugin();
class App extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider  muiTheme={getMuiTheme(lightBaseTheme)}>
      <div>
        <Controls />
        <canvas
          id="canvas"
          width="1100"
          height="550" />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;