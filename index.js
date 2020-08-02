import React from 'react';
import { render } from 'react-dom';
const videoType = 'video/webm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      videos: [],
    };
  }

  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: { echoCancellation: true }});
    this.video.srcObject = stream;
    this.video.play();
    this.mediaRecorder = new MediaRecorder(stream);
    this.chunks = [];
    this.mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
  }

  startRecording(e) {
    e.preventDefault();
    this.chunks = [];
    this.mediaRecorder.start(10);
    this.setState({recording: true});
  }

  stopRecording(e) {
    e.preventDefault();
    this.mediaRecorder.stop();
    this.setState({recording: false});
    this.saveVideo();
  }

  saveVideo() {
    const blob = new Blob(this.chunks, {type: videoType});
    const videoURL = window.URL.createObjectURL(blob);
    const videos = this.state.videos.concat([videoURL]);
    console.log({videos})
    this.setState({videos});
  }

  deleteVideo(videoURL) {
    const videos = this.state.videos.filter(a => a !== videoURL);
    this.setState({videos});
  }

  render() {
    const {recording, videos} = this.state;
    return (
      <div className="camera">
        <video
          style={{width: 400}}
          ref={a => {
            this.video = a;
          }}>
         <p>Video stream not available. </p>
        </video>
        <div>
          {!recording && <button onClick={e => this.startRecording(e)}>Start Record</button>}
          {recording && <button onClick={e => this.stopRecording(e)}>Stop</button>}
        </div>
        <div>
          <h3>Recorded Videos:</h3>
          {videos.length === 0 &&
              <h3>No videos available</h3>
          }
          {videos.map((videoURL, i) => (
            <div key={`video_${i}`}>
              <video controls style={{width: 200}} src={videoURL}   />
              <div>
                <button onClick={() => this.deleteVideo(videoURL)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default App

render(<App />, document.getElementById('root'));
