const fs = require('graceful-fs');

function readTable (path) {
  const data = fs.readFileSync(path);
    //https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
    strData = data.toString();
    return strData;
};

const assignTTO = (imp) => {
  //take in one array. split it by newlines, then remove them.
  const lines = imp.split(/\r/);
  const xNewLine = lines.map(line => line.replace(/\n/, ''));
  //Assigning two arrays to be keys for object and values
  const keys = xNewLine[0];
  const values = xNewLine.slice(1);
  //splitting lines to single words in array
  const keyEntries = keys.split(' ');
  const valueEntries = values.map((entry) => {
    let peice = null;
    let effect = null;
    let techL = null;
    let name = null;
    //Slice names out of array
    const atCost = entry.split(/(^[A-z'\s/]*(-\d?)?[A-z\s]*)/);
    console.log('atCost', atCost);
    name = atCost[1].trim();
    console.log("trimmed", name);
    let inName = name.split(' ');
    console.log('inName', inName);
    let upName = inName.map((word) => {
      const cap = word[0].toUpperCase();
      let newWord = cap;
      for(i = 1; i < word.length; i++)  {
        newWord += word[i];
      }
      console.log('newWord: ', newWord);
      return newWord;
    });
    name = '';
    upName.forEach(word => name += word);
    console.log('FinishedName: ', name);
    entry = name + ' ' + atCost[atCost.length - 1];
    //Check if there is an entry after ship class
    const containsEffect = entry.split(/(Fighter |Frigate |Cruiser |Capital )/);
    if(containsEffect.length > 1) {
      //check if there is a tech level expressed as a number before the actual effect
      const containsTl = containsEffect[containsEffect.length - 1].split(/(^\d) /);
      if(containsTl.length > 1) {
        //splitting and filtering for proper order of array
        techL = containsTl[containsTl.length - 2];
        effect = containsTl[containsTl.length - 1];
        peice = [...containsEffect[0].split(' '), containsEffect[1], techL, effect];
        const cleanPeice = peice.filter(entry => entry !== '');
        const trimPeice = cleanPeice.map(entry => entry.trim());
        return trimPeice;
      };
      //return this if there is no tech level
      effect = containsEffect[containsEffect.length - 1];
      peice = [...containsEffect[0].split(' '), containsEffect[1], effect];
      const cleanPeice = peice.filter(entry => entry !== '');
      const trimPeice = cleanPeice.map(entry => entry.trim());
      return trimPeice;
    };
    //return this if there is no effect listing
  return entry.split(' ');
  });
  //create a new object, then assign it empty keys named as the first entries in the input table
  let obj = {};
  for (let i = 0; i < valueEntries.length; i++) {
    obj[valueEntries[i][0]] = {};
    for (let j = 1; j < valueEntries.length; j++) {
      obj[valueEntries[i][0]][keyEntries[j]] = valueEntries[i][j];
    };
  };
  return obj;
};

const rawData = readTable('./Fittings.txt');
const data = assignTTO(rawData);

var json = JSON.stringify(data);

//Writes a JSON file with the name of your choice. Defaults to current date.
function JSONWrite (data, filename = null) {
  if(filename === null) {
    const date = Date.now();
    console.log("name of file assigned as: ", date);
    filename = date;
  }
  const path = filename + '.json';
  fs.writeFile(path, data, (err) => {
    if (err) throw err;
    console.log(filename, ' has been saved!');
  });
};

JSONWrite(json);



