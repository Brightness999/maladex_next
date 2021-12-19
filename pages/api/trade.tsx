// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as DATA from 'lib/data';

export default function handler(req, res) {
  res.status(200).json({
    TradingData: DATA[`${req.query.pair}Data`],
    Price: DATA[`${req.query.pair}Price`]
  })
}
