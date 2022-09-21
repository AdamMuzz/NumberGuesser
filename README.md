# NumberGuesser

### Packages

`tensorflow` or `tensorflow-macos` depending on OS<br>
`react` for frontend<br>
`express` for backend<br>

### Rough Outline

I first used the MNIST dataset from Keras to create basic digit classifier in Python.

Next I built an interactive UI to allow users to draw digits on a 28x28 grid canvas. With this, the user can press a 'guess' button and the frontend will send a JSON array representing the canvas over to the backend.

For the backend, I chose an inefficent structure to practice interfacing between express and NodeJS subprocesses. Notably, it would have been much more performat to build the entire backend in Python or even better port the tensorflow model to tensorflow-js and remove the need for a backend entirely, but I wanted the practice so I opted for the chosen route.

### Running Locally

To run the project, ensure that the ENDPOINT var located in `~/frontend/src/Canvas.js` is set to your machine's IP addr<br>
cd into the `frontend` dir and execute `npm start`<br>
cd into the `backend` dir and execute `npm start`<br>

You should now be able to successfully draw out a number and hit guess for the model to try and classify it!
