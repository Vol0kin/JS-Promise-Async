const _ = require("lodash");

//do not touch this function
const oldFunction = () => {
  const n = _.random(0, 1);
  if (n) {
    return "ok";
  } else {
    throw new Error("Error");
  }
};

//todo
//return a promise that wraps oldFunction

// This version handles the thrown exception by oldFunction().
// If oldFunction() returns "ok", it resolves the promise.
// Otherwise, it rejects the promise and returns the exception's message.
const getPromise = () => {
  return new Promise((resolve, reject) => {
    try {
      const response = oldFunction();
      resolve(response);
    } catch (error) {
      reject(error.message);
    }
  });
};

// NOTE: The output has been modified to have a better view on what's going on
_.range(10).forEach((element) =>
  getPromise()
    .then(response => console.log(element, response))
    .catch(error => console.log(element, error))
);

