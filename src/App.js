import './App.css';
import FramePlayer from './components/FramePlayer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FramePlayer 
          frames={
            [
              "https://nerdbird.com.br/natureza-slide1.jpg",
              "https://nerdbird.com.br/natureza-slide2.jpg",
              "https://nerdbird.com.br/natureza-slide3.jpg",
              "https://nerdbird.com.br/natureza-slide3.jpg",
              "https://nerdbird.com.br/natureza-slide3.jpg",
            ]}
          fps={0.2}
        />
      </header>
    </div>
  );
}

export default App;
