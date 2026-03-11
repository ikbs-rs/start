import fs from 'node:fs';
import path from 'node:path';

const envFile = process.argv[2];

if (!envFile) {
    console.error('Usage: node scripts/set-env.mjs <env-file-name>');
    process.exit(1);
}

const source = path.resolve(process.cwd(), 'src', 'configs', envFile);
const destination = path.resolve(process.cwd(), 'src', 'configs', 'env.js');

if (!fs.existsSync(source)) {
    console.error(`Env file not found: ${source}`);
    process.exit(1);
}

fs.copyFileSync(source, destination);
console.log(`Copied ${envFile} -> src/configs/env.js`);
