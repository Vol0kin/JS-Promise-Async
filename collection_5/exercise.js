// Int between [min, max)
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Stub for network request
const getValue = (x) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, getRandomInt(1, 4) * 1000);
  });
}

/*
  Factory to create tasks
  
  "run" method to start task.
*/
const createTask = ({
  identifier = '',
  isCancelled = false,
  block
} = {}) => ({
  identifier,
  run() {
     return block()
  }
})

/*
   Example:
   
   const tasks = [
      createTask( {
        identifier: 'task' + i,
        block: () => {
          return getValue(1, 1);
        }
      }),
      createTask( {
        identifier: 'task' + i,
        block: () => {
          return getValue(1, 1);
        }
      }),
      createTask( {
        identifier: 'task' + i,
        block: () => {
          return getValue(1, 1);
        }
      }),createTask( {
        identifier: 'task' + i,
        block: () => {
          return getValue(1, 1);
        }
      })
      ,createTask( {
        identifier: 'task' + i,
        block: () => {
          return getValue(1, 1);
        }
      })
   ]
   
   tasks[3].isCancelled = true
   
   const test = async () => {
      const result = await addSerialTasks(tasks)
      console.log(result)
   }
*/
const addSerialTasks = /*async*/ (tasks = []) => {
  // TODO: Add each value and return the sum.
  /*let result = 0
  for (const task of tasks) {
    if (task )
    result += await task.run()
  }
  return result*/
  
  return tasks.reduce( async (total, task) => {
    return await total + await task.run()
  }, Promise.resolve(0))
}

// Unit tests
// Do not modify the below code
describe('addSerialTasks', () => {
  const values = [...Array(3)].map((_, i) => i + 1)
  const tasks = values.map((value, i) => createTask( {
    identifier: 'task' + i,
    block: () => {
      return getValue(value, value);
    }
  }))
  
  beforeEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; 
  });
  
  const expectedResult = values.reduce((total, value) => {
    return total + value
  }, 0)
  
  it('should add all values', async function() {
      const result = await addSerialTasks(tasks)
      expect(result).toEqual(expectedResult)
  })
})

