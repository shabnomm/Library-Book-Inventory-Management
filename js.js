document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const year = document.getElementById('year').value;
    const isbn = document.getElementById('isbn').value;

    const book = { title, author, genre, year, isbn };
    
    fetch('/add-book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        loadBooks();
    });
});

function loadBooks() {
    fetch('/books')
        .then(response => response.json())
        .then(books => {
            const bookList = document.getElementById('bookList');
            bookList.innerHTML = '';
            books.forEach(book => {
                const li = document.createElement('li');
                li.textContent = `${book.title} by ${book.author} (${book.year})`;
                bookList.appendChild(li);
            });
        });
}

loadBooks();