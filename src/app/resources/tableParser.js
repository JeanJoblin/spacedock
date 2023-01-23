const fs = require('graceful-fs');

function readTable (path) {
  const data = fs.readFileSync(path);
    //https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
    strData = data.toString();
    return strData;
  
};

const assignTTO = (imp, keys) => {
  //Assigning two strings to be keys for object and values
  const titles = keys.split(' ');
  const lineEntries = imp.split(/\r/);
  //Map table entries (obj values) to new array split by newlines
  const entries = lineEntries.map( (entry) => {
    //splitting table entries by spaces
    const newEntry = entry.split(' ');
    return newEntry;
  });
  //create a new object, then assign it empty keys named as the first entries in the input table
  let obj = {};
  for (let i = 0; i < entries.length; i++) {
    obj[entries[i][0]] = {};
    for (let j = 1; j < titles.length; j++) {
      obj[entries[i][0]][titles[j]] = entries[i][j];
    }
  }
  // for(let i = 0; i < titles.length; i++) {
  //     newObj[titles[i]] = entry[i];
  // }
  return obj;
};

const hullClasses = readTable('./HullClasses.txt');
var hullClassKeys = readTable('./hullClassKeys.txt');
const hulls = assignTTO(hullClasses, hullClassKeys);
console.log(hulls.StrikeFighter);

var json = JSON.stringify(hulls);
fs.writeFile('hull.json', json, (err) => {
  if (err) throw err;
  console.log('File has been saved!');
});






