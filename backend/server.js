const express = require('express');
const app = express();
const PORT = 3000;

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
