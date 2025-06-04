const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, '../out/src')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../out/src/index.html'));
});

app.listen(port, () => {
  console.log(`Development server running at http://localhost:${port}`);
}); 