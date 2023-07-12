/* eslint-disable */
const form = document.querySelector('form');
const bookList = document.getElementById('bookList');
const books = [];

class Abooks {
  constructor(books) {
    this.books = books;
    this.local = () => {
      if (localStorage.getItem('books')) {
        books = JSON.parse(localStorage.getItem('books'));
      }
    };

    this.displayBooks = () => {
      if (localStorage.getItem('books')) {
        books = JSON.parse(localStorage.getItem('books'));
      }
      bookList.className = 'bookList';
      bookList.innerHTML = '';
      books.forEach((book, index) => {
        const li = document.createElement('li');
        li.className = 'lineBook';
        li.innerHTML = ` " ${book.title} " by ${book.author} <button class="removeBtn" data-index="${index}">Remove</button>`;
        bookList.appendChild(li);
      });
    };

    this.submitbtn = () => {
      const title = document.getElementById('bookTitle').value;
      const author = document.getElementById('authorName').value;
      const newBook = { title, author };
      books.push(newBook);
      localStorage.setItem('books', JSON.stringify(books));
      form.reset();
    };
  }
}

const Abooksa = new Abooks(books);
Abooksa.local();
Abooksa.displayBooks();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const Abooksa = new Abooks(books);
  Abooksa.submitbtn();
  Abooksa.displayBooks();
});

bookList.addEventListener('click', (event) => {
  if (event.target.classList.contains('removeBtn')) {
    const { index } = event.target.dataset;
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    const Abooksa = new Abooks(books);
    Abooksa.displayBooks();
  }
});
Abooksa.displayBooks();