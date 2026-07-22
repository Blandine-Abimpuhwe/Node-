// Build an Express server with a single GET endpoint /convert.

// - Accept two query parameters:
//     - `amount` (numeric)
//     - `currency` (either `"usd"`, `"eur"`, or `"gbp"`)
// - The server should convert the given amount **to Rwandan Francs (RWF)** using predefined conversion rates stored in a JavaScript object.
// - Respond with a JSON object showing the input and the converted value:
    
//     ```json
//     {
//       "input": { "amount": 10, "currency": "usd" },
//       "convertedAmount": 13000,
//       "unit": "RWF"
//     }
//     ```

//     Handle missing or invalid parameters with a 400 response and descriptive error.

import express from 'express';

const app = express()

// 1. Store the exchange rates as numbers
const RATES_TO_RWF = {
    usd: 1474.90, // $1 USD to RWF
    eur: 1682.20, // €1 EUR to RWF
    gbp: 1974.47  // £1 GBP to RWF
};


app.get('/convert',(req,res)=>{

    const currency= req.query.from?.toLowerCase()
    const amount= parseFloat(req.query.amount)
    const unit = "RWF"

//verify the validity of amount
if(isNaN(amount) || amount <=0){
    return res.status(400).json({error: "Provide a valid amount"})
}

// Verify if we support the requested currency
    if (!RATES_TO_RWF[currency]) {
        return res.status(400).json({ error: "Unsupported currency. Use 'usd', 'eur', or 'gbp'." });
    }
//conversion formula
const convertedAmount=RATES_TO_RWF[currency] * amount

    res.json({
        "input": {"amount": amount, "currency":currency},
        "convertedAmount" : Math.round(convertedAmount * 100)/100,
        "unit": unit
    })
}).listen(3005, ()=>console.log('server listening on port 3005'))

