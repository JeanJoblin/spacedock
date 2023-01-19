const fs = require('graceful-fs');

const readTable = (path) => {
  fs.readFile(path, (err, data) => {
    if(err) {
      throw err(err);
    }
    strData = data.toString();
    console.log(typeof(strData));
    console.log(strData);
    return strData;
  });
}

const assignTTO = (table) => {
  var cutTable;
  const breakpnts = table.matchAll(/\b/);
  console.log(breakpnts);
};

hullClasses = readTable('./HullClasses.txt');
console.log(hullClasses);
assignTTO(hullClasses);


