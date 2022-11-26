const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
exports.prisma = new PrismaClient();
const port = 3000;

require('./routes')(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})