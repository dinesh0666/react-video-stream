import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      videoSrc: null
    };
  }

  ComponentDidMount(){
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, this.handleVideo, this.videoError);
    }
  }

  handleVideo =(stream) => {
    // Update the state, triggering the component to re-render with the correct stream
    this.setState({ videoSrc: window.URL.createObjectURL(stream) });
  }

  videoError = () => {
    alert('WebCAM NOT WORKING');
  }

  render() {
    return (
      <div>
          <video src={this.state.videoSrc} autoPlay={true} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
