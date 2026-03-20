const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../data/target1900.csv');
const jsonPath = path.join(__dirname, '../data/words.json');

try {
  const data = fs.readFileSync(csvPath, 'utf8');
  const lines = data.split('\n').filter(line => line.trim() !== '');
  const headers = lines[0].split(',');

  const result = lines.slice(1).map(line => {
    // Handle commas inside quotes if necessary, but this CSV looks simple
    // For safety, let's use a simple regex split for quoted values if they exist
    const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    const obj = {};
    headers.forEach((header, index) => {
      let val = values[index] ? values[index].trim() : '';
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1).replace(/""/g, '"');
      }
      if (header === 'id' || header === 'section' || header === 'page') {
        obj[header] = parseInt(val, 10);
      } else {
        obj[header] = val;
      }
    });
    return obj;
  });

  fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2));
  console.log(`Successfully converted ${result.length} words to words.json`);
} catch (err) {
  console.error('Error during conversion:', err);
  process.exit(1);
}
