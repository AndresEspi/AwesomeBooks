// Obtener referencia a los elementos del DOM
const form = document.querySelector('form');
const titleInput = document.querySelector('input[placeholder="Title"]');
const authorInput = document.querySelector('input[placeholder="Author"]');
const listSection = document.querySelector('.list-section');

// Obtener la colección de libros almacenada en localStorage o crear una nueva si no existe
let booksCollection = JSON.parse(localStorage.getItem('booksCollection')) || [];



// Función para renderizar la colección de libros en la página
function renderBooks() {
    listSection.innerHTML = ''; // Limpiar la lista antes de renderizar los libros
  
    // Recorrer la colección de libros y crear elementos <li> para cada uno
    booksCollection.forEach((book, index) => {
      const listItem = document.createElement('li');
      
      // Crear elementos <span> para el título y el autor y agregar saltos de línea entre ellos
      const titleSpan = document.createElement('span');
      titleSpan.textContent = book.title;
      listItem.appendChild(titleSpan);
  
      const authorSpan = document.createElement('span');
      authorSpan.textContent = book.author;
      listItem.appendChild(authorSpan);
  
      // Crear botón de eliminar y agregar un listener para remover el libro correspondiente
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        removeBook(index);
      });
  
      // Agregar el botón de eliminar al elemento <li>
      listItem.appendChild(removeButton);
  
      // Agregar el elemento <li> a la lista
      listSection.appendChild(listItem);
    });
  }
  

// Función para agregar un nuevo libro a la colección
function addBook(title, author) {
  const newBook = {
    title: title,
    author: author
  };

  booksCollection.push(newBook);
  renderBooks();
  saveCollectionToLocalStorage();
}

// Función para remover un libro de la colección
function removeBook(index) {
  booksCollection = booksCollection.filter((book, i) => i !== index);
  renderBooks();
  saveCollectionToLocalStorage();
}

// Función para guardar la colección de libros en localStorage
function saveCollectionToLocalStorage() {
  localStorage.setItem('booksCollection', JSON.stringify(booksCollection));
}

// Agregar listener para el evento "submit" del formulario
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevenir el envío del formulario

  const title = titleInput.value;
  const author = authorInput.value;

  addBook(title, author);

  // Limpiar los campos del formulario después de agregar el libro
  titleInput.value = '';
  authorInput.value = '';
});

// Renderizar los libros al cargar la página
renderBooks();
