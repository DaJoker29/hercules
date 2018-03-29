#!/usr/bin/env node
const dotenv = require('dotenv');
const notp = require('notp');

dotenv.config();

const key = process.env.ACCESS_KEY;
console.log(`Access Code: ${notp.totp.gen(key)}`);

process.exit(0);
