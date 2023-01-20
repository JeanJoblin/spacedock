const fs = require('graceful-fs');

function readTable (path) {
  const data = fs.readFileSync(path);
    //https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
    strData = data.toString();
    return strData;
  
};

const assignTTO = (imp, keys) => {
  const titles = keys.split(' ');
  const lineEntries = imp.split(/\r/);
  console.log(lineEntries);
  const entries = lineEntries.map( (entry) => {
    console.log('within map:', entry);
    const newEntry = entry.split(' ');
    console.log('after Split: ', newEntry);
    return newEntry;
  });
  console.log('split titles:', titles);
  console.log('split entries:', entries);
};

const hullClasses = readTable('./HullClasses.txt');
var hullClassKeys = readTable('./hullClassKeys.txt');
hullClassKeys.toLowerCase();
console.log(hullClasses);
assignTTO(hullClasses, hullClassKeys);


