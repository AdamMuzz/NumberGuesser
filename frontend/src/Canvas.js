import './Canvas.css'
import {useState} from 'react'

//get window properties to correctly size canvas
const ratio = window.innerWidth / window.innerHeight
const Class = ratio >= 1 ? "Wide" : "Tall"

//functional component for the drawing area
function Canvas() {
	const [pixels, set_pixels] = useState(Array(28*28).fill(0))
	const [draw, set_draw] = useState(false)
	const [guess, set_guess] = useState('');
	const [confidence, set_confidence] = useState('');

	//ensure user is left-clicking
	const handle_down = () => set_draw(true)
	const handle_up = () => set_draw(false)

	//update pixel to 'painted' when hovered over and user is clicking
	const handle_paint = (i) => {
		if (!draw)
			return
		const temp = [...pixels]
		temp[i] = 255
		set_pixels(temp)
	}

	const clear = () => set_pixels(Array(28*28).fill(0)) //set pixels back to 'unpainted'

	const handle_guess = () => {
		set_guess('...');
		set_confidence('...');

		const data = pixels; //send current state of canvas over to backend
		fetch('http://192.168.1.103:3003/api', {
  			method: 'POST',
  			headers: {'Content-Type': 'application/json'},
  			body: JSON.stringify(data),
		})
  		.then((response) => response.json())
  		.then((data) => {
    		console.log('Success:', data);
			set_guess(data[0]);
			set_confidence(data[1]);
  		})
  		.catch((error) => {
    		console.error('Error:', error);
  		});
	}

	//map each T/F of canvas to a white/black pixel
	return (
		<div>
			<button className="button" onClick={clear}>Clear</button>
			<button className="button" onClick={handle_guess}>Guess</button>

			<div id="Canvas" className={Class} onMouseDown={handle_down} onMouseUp={handle_up}>
				{pixels.map((pixel, el) => {
					const pixel_class = pixel ? "Pixel Clicked" : "Pixel"
					return <Pixel Class={pixel_class} click={handle_paint} ID={el} key={el}/>
				})}
			</div>

			<h2>Guess: {guess}</h2>
			<h2>Confidence: {confidence}</h2>
		</div>
	);
}

//functional component for each individual 'pixel'
function Pixel(props) {
	const handle_click = () => props.click(props.ID)

	return (
		<div className={props.Class} id={`Pixel${props.ID}`} onMouseOver={handle_click} />
	);
}

export default Canvas