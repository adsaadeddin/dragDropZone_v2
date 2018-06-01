import React, { Component } from 'react';
import './App.css';
import Dropzone from './Dropzone';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">
          <h1 className="App-title">Welcome to Dropzone</h1>
        </header>
        <p className="App-intro">
          here is the Dropzone ! <br />
          Drag and Drop your Files or choose them !
        </p>
        <Dropzone />
      </div>
    );
  }
}

export default App;
