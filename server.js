const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

app.post('/api/register', async (req, res) => {
    try {
        const user = {
            companyName: req.body.companyName,
            ownerName: req.body.ownerName,
            rollNo: req.body.rollNo,
            ownerEmail: req.body.ownerEmail,
            accessCode: req.body.accessCode
        };

        // Check if user object is empty or null
        if (!user) {
            return res.status(400).json({ message: "User data is invalid" });
        }

        // Send user data to the test API
        const response = await axios.post('http://test.api', user);

        // If registration successful, send success response
        res.status(200).json({ message: "Registration successful", data: response.data });
    } catch (error) {
        // Handle axios request failure
        if (error.response) {
            res.status(error.response.status).json({ message: error.response.statusText });
        } else if (error.request) {
            res.status(500).json({ message: "Failed to send request to server" });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)});