#!/usr/bin/env node
const base32 = require('thirty-two');
const dotenv = require('dotenv');

dotenv.config();

const key = process.env.ACCESS_KEY;

const encoded = base32.encode(key);

const forGoogle = encoded.toString().replace(/=/g, '');

const uri = `otpauth://totp/Herc?secret=${forGoogle}`;
console.log(
  `Link: https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=${uri}`,
);
