import './App.css';
import FramePlayer from './components/FramePlayer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FramePlayer 
          frames={
            [
              "https://cinemaplanet.pt/wp-content/uploads/2020/12/turning-red.jpeg",
              "https://trecobox.com.br/wp-content/uploads/2021/11/filmes-2022.jpg",
              "https://www.oficinadanet.com.br/imagens/post/23817/maes-androides.jpg",
              "https://minhaseriefavorita.com/wp-content/uploads/2022/03/projeto-almanaque.jpg",
              "https://blog.unicep.edu.br/wp-content/uploads/2019/01/5-filmes-sobre-fisica-para-voce-estudar-comendo-pipoca.jpg",
            ]}
          fps={0.2}
        />
      </header>
    </div>
  );
}

export default App;
