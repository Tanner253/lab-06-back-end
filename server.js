'use strict'

//load env variables from .env
require('dotenv').config();


//appplication dependencies
const express = require('express');


//application setup
const PORT = process.env.PORT || 3000;
const app = express();



