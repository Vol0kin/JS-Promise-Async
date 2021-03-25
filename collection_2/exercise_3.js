const _ = require('lodash');

const randomPromise = acc => {
  const n = _.random(0, 1);
  return n ? Promise.resolve(acc + "ok\n") : Promise.reject(acc + "no\n");
};

Promise.resolve("")
  .then(randomPromise)
  .catch(randomPromise)
  .then(randomPromise)
  .then(console.log)
  .catch(console.log);

// move the above code to async/await sintax
(async () => {
  let acc = "";
  let timesResolved = 0;
  let timesRejected = 0;
  let beginsWithOk = false;

  try {
    acc = await randomPromise(acc);
    timesResolved++;
    beginsWithOk = true;
  } catch (firstReject) {
    acc = firstReject;
    timesRejected++;
  }

  try {
    acc = await randomPromise(acc);
    timesResolved++;
  } catch (secondReject) {
    acc = secondReject;
    timesRejected++;
  }

  // This block will execute only if acc = "no ok"
  if (timesResolved < 2 && timesRejected < 2 && !beginsWithOk) {
    try {
      acc = await randomPromise(acc);
    } catch (thirdReject) {
      acc = thirdReject;
    }
  }

  console.log('Async output:');
  console.log(acc);
})();

