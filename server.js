const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/Teste'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname,'/dist/Teste/index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log(`Listen on port: ${process.env.PORT || 8080}`));
