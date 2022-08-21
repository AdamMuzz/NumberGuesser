import './App.css';
import Canvas from './Canvas';
import Guess from './Guess';

function App() {
  return (
    <div className="App">
		<div id="Intro">
			<h1>Hello World!</h1>
			<p>Welcome to my interactive introduction to machine learning.
			This project used the MNIST dataset from Keras to build a classification AI for handwritten digits.
			To begin, simply left-click and drag to draw on the canvas.
			The AI will then attempt to guess what digit you are drawing in real time!</p>
		</div>

		<Canvas />
		<Guess />
    </div>
  );
}

export default App;
