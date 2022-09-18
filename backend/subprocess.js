const { spawn } = require('node:child_process');

async function run_subprocess(input) {
	const input_json = JSON.stringify(input)
	//console.log(input_json);

	const args = ['../ML/api.py', input_json] //arguments for python to execute
	const process = spawn('/Users/admuzz/Desktop/NumberGuesser/venv/bin/python', args); //execute virtualenv python w/ above args

	const res = ['guess', 'confidence'] //initalize return struct

	//collect outout from subprocess
	process.stdout.on('data', (data) => {
		//only process relevant stdout
		if (data.includes('confidence')) {
			const result = `${data}`;
			const processed_result = result.replace('\n', '').split(' ');
			//update return vals
			res[0] = processed_result[0];
			res[1] = processed_result[2];
			//console.log(processed_result);
		}
	});
	
	//force function to wait until python script is finished executing
	const to_return = await new Promise((resolve) => {
		process.on('close', (code) => {
			resolve(res);
		})
	});

	return to_return;

	/*process.on('close', (code) => {
		//console.log(`child process exited with code ${code}`);
		return(res);
	});*/

	//return(res);
	/*process.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});
	process.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`);
	});*/
}

exports.run_subprocess = run_subprocess;