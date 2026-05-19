const express = require('express');

const app = express();
app.use(express.json());

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
  const { number, csv } = req.body;
  const match = CARDS.find(c => c.number === number && c.csv === csv);
  res.send(match ? 'VALID' : 'INVALID');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
