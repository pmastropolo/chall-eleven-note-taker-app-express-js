const express = require('express');     // Import Express
const fs = require('fs'); // Import 'fs' File System
const path = require('path'); // Import path module for resolving file paths
const { v4: uuidv4 } = require('uuid');

const app = express();