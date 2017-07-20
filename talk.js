













						   


								async / await
							




















async / await:
	* makes asynchronous code read like synchronous code
	* which leads to better readable / understandable code
	* works realy nice with promises
	



		











Any function can be transformed to return a promise by prefixing it with async

example:

// Promise based
function iTakeSomeTime() {
	return new Promise((resolve, reject) => {
		resolve(42);
	})
}

// async/await based
async function iTakeSomeTime() {
	return 42;
}

//usage
iTakeSomeTime()
	.then(result => console.log(result)); // 42


















This work with any form of function

example:

const iReturnAPromise = async () => 42;

async function iReturnAPromise() {
	return 42;
}

const obj = {
	async iReturnAPromise() {
		return 42;
	}
}

















awaiting a promise pauses the function execution until the awaited 
promise is returned. 	

example:

function iReturnAPromise() {
	return new Promise(resolve => {
		resolve(42)
	})
}

// Promise based
function handlePromise() {
	iReturnAPromise()
		.then(result => console.log(result)); // 42
}

// async/await based
async function handlePromise() {
	const result = await iReturnAPromise();
	console.log(result); // 42
}












Any value returned by an async function is like a resolved promise, which can
be used by any promise consuming function

example:

async function aPromise() {
	return 'a promise';
}

async function anotherPromise() {
	return 'another promise';
}

Promise.all([aPromise, anotherPromise])
	.then(values => console.log(values[1])) // another promise




















By throwing an error, the consuming function can use catch to handle the error

example:

function iThrow() {
	return Promise((resolve, reject) => {
		reject(new Error('an error'));
	})
}

async function iThrow() {
	throw new Error('an error');
}

iThrow()
	.catch(err => console.log(err)); // an error





















							Exercise 1
							
































							Exercise 2































							Exercise 3