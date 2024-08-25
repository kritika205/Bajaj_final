const express = require('express');
const bodyParser = require('body-parser');
//const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
//app.use(cors());

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/[a-zA-Z]/.test(item)) {
            alphabets.push(item);
            if (/[a-z]/.test(item)) {
                if (item > highestLowercaseAlphabet) {
                    highestLowercaseAlphabet = item;
                }
            }
        }
    });

    res.json({
        is_success: true,
        user_id: "abc_21", 
        email: "abc@google.com", 
        roll_number: "0083", 
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});

// GET /bfhl endpoint
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
