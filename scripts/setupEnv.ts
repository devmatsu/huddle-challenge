import fs from 'fs';
import path from 'path';

const dotenvPath = path.resolve(__dirname, '../.env');

if (!fs.existsSync(dotenvPath)) {
  fs.writeFileSync(dotenvPath, 'DATABASE_URL="file:./dev.db"\n');
  console.log(
    '.env file not found. Created with default DATABASE_URL="file:./dev.db"'
  );
}
