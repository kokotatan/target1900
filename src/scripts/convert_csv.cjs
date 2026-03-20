const fs = require('fs');
const path = require('path');

const root = process.cwd();
const csvPath = path.join(root, 'src/data/target1900.csv');
const jsonPath = path.join(root, 'src/data/words.json');

console.log(`Reading from: ${csvPath}`);

try {
  const data = fs.readFileSync(csvPath, 'utf8');
  const lines = data.split(/\r?\n/).filter(line => line.trim() !== '');
  const headers = lines[0].split(',').map(h => h.trim());

  const result = lines.slice(1).map((line, lineIdx) => {
    // Standard CSV split handling for this specific file
    const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    const obj = {};
    headers.forEach((header, index) => {
      let val = values[index] ? values[index].trim() : '';
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1).replace(/""/g, '"');
      }
      if (header === 'id' || header === 'section' || header === 'page') {
        const parsed = parseInt(val, 10);
        obj[header] = isNaN(parsed) ? 0 : parsed;
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
