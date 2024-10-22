const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8121;

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const { name, id } = req.body;

    // Log form data to a file
    const logData = `Name: ${name}, StudentId: ${id} \n`;
    const logFilePath = path.join(__dirname, 'public_html/form-submissions.log');

    fs.appendFile(logFilePath, logData, (err) => {
        if (err) {
            console.error('Error writing to log file', err);
            return res.status(500).send('Internal Server Error');
        }

        console.log('Form data logged successfully');
        res.redirect('http://quinnrana.com/frankensite.html');

    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

