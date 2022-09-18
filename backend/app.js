const express = require('express')
const app = express()
const cors = require('cors')
const port = 3003

const {run_subprocess} = require('./subprocess.js');

const cors_options = {
	origin: '*', //allow any IP to connect to api
	methods: ['GET','POST'], //allow GET & POST reqs thru
}

app.use(cors()) //enable CORS for api
app.use(express.json()) //make express parse JSON posts to be in req.body

app.get('/', (req, res) => {
	res.send('Hello World!')
})

//async b/c python script takes time
app.post('/api', async (req, res) => {
	const response = await run_subprocess(req.body); //force wait for api call
	res.send(response)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})