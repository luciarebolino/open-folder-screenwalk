const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the root directory
app.use(express.static(__dirname));

// Proxy endpoint to fetch video URLs from NASA
app.get('/proxy', async (req, res) => {
    const query = req.query.q;
    const apiKey = 'YOUR_NASA_API_KEY';
    const url = `https://images-api.nasa.gov/search?q=${query}&media_type=video`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching data from NASA API');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
