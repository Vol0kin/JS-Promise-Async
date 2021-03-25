/*
  Get the same behavior in next code, removing 'then' expressions.

*/
function getCountry(){
    return fetch('https://pkgstore.datahub.io/core/country-codes/country-codes_json/data/471a2e653140ecdd7243cdcacfd66608/country-codes_json.json')
        
}

/*getCountry().then(response => response.json())
    .then(response => response.map(country => country['CLDR display name']))
    .then(response => console.log(response));*/

(async () => {
  try {
    const response = await getCountry();
    const jsonResponse = await response.json();
    const countryNames = jsonResponse.map(country => country['CLDR display name']);
    
    console.log(countryNames);
  } catch (error) {
    console.log(error.message);
  }
})();
