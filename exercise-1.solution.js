const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function start() {
	console.log('before delay');
	await delay(1000);
	console.log('after delay');
}

start()
	.then(() => console.log('start completed'));