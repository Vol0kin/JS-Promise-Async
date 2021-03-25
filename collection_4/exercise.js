/*
  Make a function sleep, making use of setTimeout and promises/async-await
  The first and only arg is the time you must wait in ms
  
  Usage sample
  
  ...
  somecode()
  await sleep(1000)
  moreCode()
  ...
*/

const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

// unit tests
// do not modify the below code
describe('Sleep', function() {
  const ms = 100;
  it('should return a thenable promise', (done) => {
    const promise = sleep(ms).then(() => {
      done();
    });
    expect(promise).toEqual(jasmine.any(Promise));
  });
  it('should use the parameter "ms"', () => {
    spyOn(window, 'setTimeout');
    sleep(ms);
    expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), ms);
  });
  it('should not be called before "ms"', (done) => {
    sleep(ms).then(() => {
      fail();
    });
    setTimeout(() => {
      expect(true).toEqual(true); //to avoid warning 'Spec has no expectations'
      done();
    }, ms - 10)
  });
});

