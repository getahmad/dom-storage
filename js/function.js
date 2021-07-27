function insertData(book) {
  let bookData = [];
  if (localStorage.getItem(localStorageKey) === null) {
    localStorage.setItem(localStorageKey, 0);
  } else {
    bookData = JSON.parse(localStorage.getItem(localStorageKey));
  }
  bookData.unshift(book);
  localStorage.setItem(localStorageKey, JSON.stringify(bookData));
  showData(getData());
}

function getData() {
  return JSON.parse(localStorage.getItem(localStorageKey)) || [];
}

function showData(books = []) {
  incompleteBook.innerHTML = "";
  completedBook.innerHTML = "";
  books.forEach((book) => {
    if (book.isCompleted == false) {
      let el = `
        <div class="card">
          <div class="card-content">
              <h4><b>${book.title}</b></h4>
              <p>${book.author}</p>
              <p>${book.year}</p>
          </div>
          <div class="action">
              <button class="done" onclick="readedBook('${book.id}')"></button>
              <button class="trash" onclick="deleteBook('${book.id}')"></button>
              <button class="edit" onclick="editBook('${book.id}')"></button>
          </div>
        </div>
              `;
      incompleteBook.innerHTML += el;
    } else {
      let el = `
        <div class="card">
        <div class="card-content">
            <h4><b>${book.title}</b></h4>
            <p>${book.author}</p>
            <p>${book.year}</p>
        </div>
        <div class="action">
              <button class="restore" onclick="unreadedBook('${book.id}')"></button>
              <button class="trash" onclick="deleteBook('${book.id}')"></button>
              <button class="edit" onclick="editBook('${book.id}')"></button>
          </div>
      </div>
              `;
      completedBook.innerHTML += el;
    }
  });
}

function showSearchResult(books) {
  searchResult.innerHTML = "";
  books.forEach((book) => {
    let el = `
          <div class="card">
          <div class="card-content">
              <h4><b>${book.title}</b></h4>
              <p>${book.author}</p>
              <p>${book.year}</p>
              <p>${book.isCompleted ? "already read" : "haven't read"}</p>
          </div>
        </div>
          `;
    searchResult.innerHTML += el;
  });
}

function readedBook(id) {
  let confirmation = confirm("Move to completed?");
  if (confirmation == true) {
    const bookDataDetail = getData().filter((data) => data.id == id);
    const newBook = {
      id: bookDataDetail[0].id,
      title: bookDataDetail[0].title,
      author: bookDataDetail[0].author,
      year: bookDataDetail[0].year,
      isCompleted: true,
    };
    const bookData = getData().filter((data) => data.id != id);
    localStorage.setItem(localStorageKey, JSON.stringify(bookData));
    insertData(newBook);
  } else {
    return 0;
  }
}

function unreadedBook(id) {
  let confirmation = confirm("Move to incomplete?");
  if (confirmation == true) {
    const bookDataDetail = getData().filter((data) => data.id == id);
    const newBook = {
      id: bookDataDetail[0].id,
      title: bookDataDetail[0].title,
      author: bookDataDetail[0].author,
      year: bookDataDetail[0].year,
      isCompleted: false,
    };
    const bookData = getData().filter((data) => data.id != id);
    localStorage.setItem(localStorageKey, JSON.stringify(bookData));
    insertData(newBook);
  } else {
    return 0;
  }
}

function editBook(id) {
  const bookDataDetail = getData().filter((data) => data.id == id);
  title.value = bookDataDetail[0].title;
  author.value = bookDataDetail[0].author;
  year.value = bookDataDetail[0].year;
  bookDataDetail[0].isCompleted
    ? (isCompleted.checked = true)
    : (isCompleted.checked = false);
  btnSubmitBook.innerHTML = "Edit book";
  btnSubmitBook.value = bookDataDetail[0].id;
}

function deleteBook(id) {
  let confirmation = confirm("Are you sure you want to delete?");
  if (confirmation == true) {
    const bookDataDetail = getData().filter((data) => data.id == id);
    const bookData = getData().filter((data) => data.id != id);
    localStorage.setItem(localStorageKey, JSON.stringify(bookData));
    showData(getData());
    alert(`Book ${bookDataDetail[0].title} move to trash`);
  } else {
    return 0;
  }
}
