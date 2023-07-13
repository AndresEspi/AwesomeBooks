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

function mostrarFechaHora() {
  var fechaHora = new Date();
  
  // Obtener el día del mes
  var dia = fechaHora.getDate();
  var sufijoDia = obtenerSufijoDia(dia);

  // Obtener el mes
  var mes = fechaHora.toLocaleString('default', { month: 'long' });

  // Obtener el año
  var anio = fechaHora.getFullYear();

  // Obtener la hora, minutos y segundos
  var hora = fechaHora.getHours();
  var minutos = fechaHora.getMinutes();
  var segundos = fechaHora.getSeconds();

  // Formatear la hora
  var sufijoHora = (hora < 12) ? 'am' : 'pm';
  hora = (hora % 12 === 0) ? 12 : hora % 12;

  // Convertir minutos a cadena y rellenar con ceros a la izquierda
  minutos = minutos.toString().padStart(2, '0');

  // Construir el mensaje
  var mensaje = mes + " " + dia + sufijoDia + " " + anio + ", " + hora + ":" + minutos + ":" + segundos + " " + sufijoHora;

  document.getElementById("fecha-hora").textContent = mensaje;
}

// Función para obtener el sufijo del día
function obtenerSufijoDia(dia) {
  if (dia === 1 || dia === 21 || dia === 31) {
    return "st";
  } else if (dia === 2 || dia === 22) {
    return "nd";
  } else if (dia === 3 || dia === 23) {
    return "rd";
  } else {
    return "th";
  }
}

// Actualizar la fecha y hora cada segundo
setInterval(mostrarFechaHora, 1000);

const options = document.querySelectorAll('.options a');