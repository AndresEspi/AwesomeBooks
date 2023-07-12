/* eslint-disable */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('booksCollection')) || [];
    this.form = document.querySelector('form');
    this.titleInput = document.querySelector('input[placeholder="Title"]');
    this.authorInput = document.querySelector('input[placeholder="Author"]');
    this.listSection = document.querySelector('.list-section');

    if (this.books.length === 0) {
      const initialBooks = [
        { title: 'Book 1', author: 'Author 1' },
        { title: 'Book 2', author: 'Author 2' }
      ];
      this.books = initialBooks.map(book => new Book(book.title, book.author));
      this.saveCollectionToLocalStorage();
    }

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = this.titleInput.value;
      const author = this.authorInput.value;
      this.addBook(title, author);
      this.titleInput.value = '';
      this.authorInput.value = '';
    });

    this.renderBooks();
  }

  renderBooks() {
    this.listSection.innerHTML = '';
  
    this.books.forEach((book, index) => {
      const listItem = document.createElement('li');
      const bookInfoSpan = document.createElement('span');
      bookInfoSpan.textContent = `"${book.title}" by ${book.author}`;
      listItem.appendChild(bookInfoSpan);
  
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        this.removeBook(index);
      });
  
      listItem.appendChild(removeButton);
      this.listSection.appendChild(listItem);
    });
  }
  

  addBook(title, author) {
    if (title && author) {
      const newBook = new Book(title, author);
      this.books.push(newBook);
      this.renderBooks();
      this.saveCollectionToLocalStorage();
    }
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.renderBooks();
    this.saveCollectionToLocalStorage();
  }

  saveCollectionToLocalStorage() {
    localStorage.setItem('booksCollection', JSON.stringify(this.books));
  }
}

new BookCollection();