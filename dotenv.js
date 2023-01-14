const dotenv = require('dotenv')
const { join } = require('path')
const fs = require('fs')
module.exports = dotenv.parse(fs.readFileSync(join(__dirname, '.env')))
