const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8500;
const cors = require('cors');
const bot = require('./bot');
app.use(cors())

app.get('/', async (req, res, next) => {
    try {
        const result = await bot('https://bscscan.com/token/0x7029994f28fd39ff934a96b25591d250a2183f67');
        res.send(result);
        next();
    } catch (error) {
        next(error)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});