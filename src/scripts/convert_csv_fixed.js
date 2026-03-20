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
    // Simple split for now, but handle basic quotes
    const values = line.split(',');
    if (values.length < headers.length) {
      console.warn(`Warning: Line ${lineIdx + 2} has missing columns: ${line}`);
    }
    const obj = {};
    headers.forEach((header, index) => {
      let val = values[index] ? values[index].trim() : '';
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
