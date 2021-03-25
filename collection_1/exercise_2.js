const _ = require('lodash');

const randomPromise = acc => {
  const n = _.random(0, 1);
  return n ? Promise.resolve(acc + "a") : Promise.reject(acc + "b");
};

Promise.resolve("")
  .then(randomPromise)
  .then(randomPromise)
  .catch(randomPromise)
  .then(randomPromise)
  .then(console.log)
  .catch(console.log);

// move the above code to async/await syntax
(async () => {
  let acc = "";
  let limitSequence = false;

  try {
    acc = await randomPromise(acc);         // then() #1
    acc = await randomPromise(acc);         // then() #2.1
    limitSequence = true;
  } catch (firstReject) {                   // catch() #1
    acc = firstReject;
  }

  try {
    acc = await randomPromise(acc);         // then() #2.2 / then() #3.1

    if (!limitSequence) {
      acc = await randomPromise(acc);       // then() #3.2 iff then() #2.1 not executed
    }
  } catch (secondReject) {                  // catch() #2
    acc = secondReject;
  }

  console.log(`Async output: ${acc}`);
})();

