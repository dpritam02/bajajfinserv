
const serverless = require('serverless-http');



const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST method
app.post('/process-data', (req, res) => {
    const { userId, collegeEmail, collegeRoll, numbersArray, alphabetsArray } = req.body;

    if (!userId || !collegeEmail || !collegeRoll || !numbersArray || !alphabetsArray) {
        return res.status(400).json({ status: 'error', message: 'Missing required fields' });
    }

    const highestAlphabet = alphabetsArray.reduce((max, char) => (char > max ? char : max), alphabetsArray[0]);

    res.json({
        status: 'success',
        userId: userId,
        collegeEmailId: collegeEmail,
        collegeRollNumber: collegeRoll,
        numbersArray: numbersArray,
        alphabetsArray: alphabetsArray,
        highestAlphabet: highestAlphabet,
    });
});

// GET method
app.get('/operation-code', (req, res) => {
    const operationCode = "OP1234"; // This could be any string or code
    res.json({ operation_code: operationCode });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


module.exports.handler = serverless(app);
