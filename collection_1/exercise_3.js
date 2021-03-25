const _ = require("lodash");

const LIMIT = 100;

const fetchNext = n =>
  Promise.resolve({
    objects: _.range(n, n + 20), // this is an array with 20 elements
    meta: {
      next: n > LIMIT ? null : n + 20
    }
  });

// You should fetch all pages.
// You must use the return meta.next parameter in order to fetch the next page
// All objects returned in the whole pagination must be saved in an array
// For first page, do fetchNext(0)

// Solution: create async function that fetches the data until meta.next is null.
// Once all data is fetched, return it.
const fetchAllData = async () => {
  let n = 0;
  let pagesData = [];

  while (n !== null) {
    let page = await fetchNext(n);
    pagesData = pagesData.concat(page.objects);

    n = page.meta.next;
  }

  return pagesData;
}

// Fetch all of the data and print it
(async () => {
  const pagesData = await fetchAllData();

  console.log(pagesData);
})();

