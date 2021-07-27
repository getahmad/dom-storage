window.addEventListener("load", function () {
  if (localStorage.getItem(localStorageKey) !== null) {
    const booksData = getData();
    showData(booksData);
  }
});

btnSearchBooks.addEventListener("click", function (event) {
  event.preventDefault();
  if (localStorage.getItem(localStorageKey) == null) {
    return alert("There isno data");
  } else {
    const getByTitle = getData().filter(
      (data) => data.title == inputSearchBooks.value.trim()
    );
    if (getByTitle.length == 0) {
      const getByAuthor = getData().filter(
        (data) => data.author == inputSearchBooks.value.trim()
      );
      if (getByAuthor.length == 0) {
        const getByYear = getData().filter(
          (data) => data.year == inputSearchBooks.value.trim()
        );
        if (getByYear.length == 0) {
          alert(`there is no book: ${inputSearchBooks.value}`);
        } else {
          showSearchResult(getByYear);
        }
      } else {
        showSearchResult(getByAuthor);
      }
    } else {
      showSearchResult(getByTitle);
    }
  }

  inputSearchBooks.value = "";
});

btnSubmitBook.addEventListener("click", function () {
  if (btnSubmitBook.value == "") {
    if (title.value == "" || author.value == "" || year.value == "") {
      alert("Please complete input");
    } else {
      const newBook = {
        id: +new Date(),
        title: title.value.trim(),
        author: author.value.trim(),
        year: year.value,
        isCompleted: isCompleted.checked,
      };
      insertData(newBook);
      title.value = "";
      author.value = "";
      year.value = "";
      isCompleted.checked = false;
    }
  } else {
    if (title.value == "" || author.value == "" || year.value == "") {
      alert("Please complete input");
    } else {
      const bookData = getData().filter(
        (data) => data.id != btnSubmitBook.value
      );
      localStorage.setItem(localStorageKey, JSON.stringify(bookData));
      const editBook = {
        id: btnSubmitBook.value,
        title: title.value.trim(),
        author: author.value.trim(),
        year: year.value,
        isCompleted: isCompleted.checked,
      };
      insertData(editBook);
      btnSubmitBook.innerHTML = "input your book";
      btnSubmitBook.value = "";
      title.value = "";
      author.value = "";
      year.value = "";
      isCompleted.checked = false;
      alert("your books have been changed");
    }
  }
});
