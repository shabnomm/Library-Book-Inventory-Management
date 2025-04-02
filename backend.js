const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/books', (req, res) => {
    fs.readFile('books.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading books data');
        }
        res.send(JSON.parse(data));
    });
});

app.post('/add-book', (req, res) => {
    const newBook = req.body;
    fs.readFile('books.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading books data');
        }
        const books = JSON.parse(data);
        books.push(newBook);
        fs.writeFile('books.json', JSON.stringify(books), (err) => {
            if (err) {
                return res.status(500).send('Error saving book data');
            }
            res.send({ message: 'Book added successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});