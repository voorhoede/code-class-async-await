const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// implement the function start by using async/await 
// the function start should delay for 1 second en the resolve

start()
	.then(() => console.log('start completed'));