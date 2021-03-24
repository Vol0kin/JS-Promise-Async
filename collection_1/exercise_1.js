const _ = require('lodash');

const delay = ms =>
  new Promise(resolve =>
    setTimeout(() => {
      console.log(ms);
      resolve();
    }, ms)
  );

const getPromises = () => _.map(_.range(4), () => delay(_.random(300)));

//TODO
// receives an array of promises
// returns a promise, that's solved as soon as any of the promises in the array
// is solved
// 
// My solution: return a Promise that iterates over the array of promises and
// instructs them to resolve this promise if one of them finishes.
const getFasterPromise = promises => {
  return new Promise(resolve => {
    promises.forEach(promise => promise.then(() => resolve()));
  });
};

(async () => {
  await getFasterPromise(getPromises());
  console.log("this must be the second log");
})();

