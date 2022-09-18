const { spawn } = require('node:child_process');

function run_subprocess(input) {
	const input_json = JSON.stringify(input)
	//console.log(input_json);

	const args = ['../ML/api.py', input_json] //arguments for python to execute
	const process = spawn('/Users/admuzz/Desktop/NumberGuesser/venv/bin/python', args); //execute virtualenv python w/ above args

	const res = ['guess', 'confidence']
	//collect outout from subprocess
	process.stdout.on('data', (data) => {
		//only process relevant stdout
		if (data.includes('confidence')) {
			const result = `${data}`;
			const processed_result = result.replace('\n', '').split(' ');
			res[0] = processed_result[0];
			res[1] = processed_result[2];
			//console.log(processed_result);
		}
	});
	
	return res;
	
	/*process.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});
	process.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`);
	});
	process.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	});*/
}

exports.run_subprocess = run_subprocess;