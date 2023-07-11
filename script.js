/* eslint-disable */
const form = document.querySelector('form');
const bookList = document.getElementById('bookList');
const menua = document.querySelector('.menua');
const menub = document.querySelector('.menub');
const menuc = document.querySelector('.menuc');
const main = document.querySelector('.list');
const add = document.querySelector('.add_new');
const contact = document.querySelector('.contact');
let books = [];

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
    Abooksa.displayBooks();
  }
});
Abooksa.displayBooks();

menua.addEventListener('click', () => {
  main.classList.toggle('hide');
  add.classList.add('hide');
  contact.classList.add('hide');
});
menub.addEventListener('click', () => {
  add.classList.toggle('hide');
  main.classList.add('hide');
  contact.classList.add('hide');
});
menuc.addEventListener('click', () => {
  contact.classList.toggle('hide');
  main.classList.add('hide');
  add.classList.add('hide');
});