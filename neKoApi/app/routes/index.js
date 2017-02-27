const files = [
  'test',
  //'chat',
  //'users',
];

module.exports = files
    .map(file => `${__dirname}/${file}`)
    .map(require);
