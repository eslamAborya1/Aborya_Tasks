const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    let contacts = [];
    const filePath = 'contact.json';

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        contacts = data ? JSON.parse(data) : [];
    }

    contacts.push({
        name,
        email,
        subject,
        message,
        date: new Date()
    });

    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2), 'utf8');

    res.json({ success: true, message: 'Message saved successfully!' });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
