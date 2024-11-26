const { parentPort } = require('worker_threads');

function calculateFibonacci(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, n);
  });
}

const n = 5000;

parentPort.on('message', async (data) => {
  console.log(`Fibonacci(${n}) is b eing calculated...`);
  const result = await calculateFibonacci(n);
  parentPort.postMessage(result);
});
