const _ = require("lodash");

const delay = ms =>
  new Promise(resolve =>
    setTimeout(() => {
      console.log(ms);
      resolve(ms);
    }, ms)
  );

const getNumber = () => delay(_.random(1, 1000));

const arrayOfPromises = _.range(10).map(() => getNumber());

//Each promise in arrayOfPromises is solved with a different number.
//Get the sum of all those numbers

// Wait for all promises to finish and then sum the returned values
Promise.all(arrayOfPromises).then(numbers => {
  const numSum = numbers.reduce((current, next) => current + next);
  console.log(`The sum of all the numbers is: ${numSum}`);
});

