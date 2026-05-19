const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');

const app = express();
app.use(express.json());

const spec = YAML.parse(fs.readFileSync('./openapi.yaml', 'utf8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));

const CARDS = [
  { number: '4532015112830366', csv: '123' },
  { number: '5425233430109903', csv: '456' },
  { number: '378282246310005',  csv: '789' },
  { number: '6011111111111117', csv: '234' },
  { number: '5555555555554444', csv: '567' },
  { number: '4111111111111111', csv: '890' },
  { number: '4012888888881881', csv: '321' },
  { number: '5105105105105100', csv: '654' },
  { number: '4222222222222',    csv: '987' },
  { number: '4917300800000000', csv: '147' },
  { number: '4539571147647251', csv: '258' },
  { number: '5392968321554959', csv: '369' },
  { number: '3766246438947121', csv: '159' },
  { number: '6011654498450932', csv: '753' },
  { number: '3485702738123456', csv: '951' },
  { number: '4929898356790456', csv: '852' },
  { number: '5281824618846132', csv: '741' },
  { number: '3792377300512345', csv: '963' },
  { number: '4556779856374859', csv: '357' },
  { number: '5476394857129345', csv: '468' },
];

app.post('/validate', (req, res) => {
  const { number, csv, token } = req.body;

  if (typeof token !== 'number' || token < 1000 || token > 2000) {
    return res.status(400).send('INVALID TOKEN');
  }

  const match = CARDS.find(c => c.number === number && c.csv === csv);
  res.send(match ? 'VALID' : 'INVALID');
});

app.get('/', (req, res) => {
  const rows = CARDS.map(c => `<tr><td>${c.number}</td><td>${c.csv}</td></tr>`).join('');
  res.send(`<!DOCTYPE html>
<html>
<head><title>Cards</title><style>
  body { font-family: monospace; background: #111; color: #0f0; padding: 2rem; }
  table { border-collapse: collapse; }
  td { padding: 4px 12px; border-bottom: 1px solid #333; }
</style></head>
<body>
<h1>Credit Cards</h1>
<table><tr><th>Number</th><th>CSV</th></tr>${rows}</table>
<p><a href="/docs" style="color:#0f0">API Docs</a></p>
</body>
</html>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
