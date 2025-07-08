// Mendapatkan elemen formulir
const bookForm = document.getElementById("bookForm");
const incompleteBookList = document.getElementById("incompleteBookList");
const completeBookList = document.getElementById("completeBookList");
const searchForm = document.getElementById("searchBook");

// Fungsi untuk menyimpan buku ke localStorage
function saveBooks() {
  const books = [];
  const incompleteBooks = incompleteBookList.querySelectorAll(
    '[data-testid="bookItem"]'
  );
  const completeBooks = completeBookList.querySelectorAll(
    '[data-testid="bookItem"]'
  );

  incompleteBooks.forEach((book) => {
    books.push({
      id: book.getAttribute("data-bookid"),
      title: book.querySelector('[data-testid="bookItemTitle"]').innerText,
      author: book
        .querySelector('[data-testid="bookItemAuthor"]')
        .innerText.replace("by ", ""),
      year: Number(
        book.querySelector('[data-testid="bookItemYear"]').innerText
      ),
      isComplete: false,
    });
  });

  completeBooks.forEach((book) => {
    books.push({
      id: book.getAttribute("data-bookid"),
      title: book.querySelector('[data-testid="bookItemTitle"]').innerText,
      author: book
        .querySelector('[data-testid="bookItemAuthor"]')
        .innerText.replace("by ", ""),
      year: Number(
        book.querySelector('[data-testid="bookItemYear"]').innerText
      ),
      isComplete: true,
    });
  });

  localStorage.setItem("books", JSON.stringify(books));
}

// Menambahkan event listener pada formulir
bookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Mengambil nilai dari input
  const title = document.getElementById("bookFormTitle").value;
  const author = document.getElementById("bookFormAuthor").value;
  const year = Number(document.getElementById("bookFormYear").value);
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  // Menghasilkan ID buku secara otomatis menggunakan timestamp
  const bookId = new Date().getTime();

  // Membuat elemen buku baru
  const bookItem = document.createElement("div");
  bookItem.setAttribute("data-bookid", bookId);
  bookItem.setAttribute("data-testid", "bookItem");
  bookItem.className = "book-card";

  // Menambahkan konten ke elemen buku
  bookItem.innerHTML = `
        <div class="book-info">
            <h3 data-testid="bookItemTitle" class="book-title">${title}</h3>
            <p data-testid="bookItemAuthor" class="book-meta">by ${author}</p>
            <p data-testid="bookItemYear" class="book-meta">${year}</p>
        </div>
        <div class="book-actions">
            <button data-testid="bookItemIsCompleteButton" class="action-button ${
              isComplete ? "incomplete" : "complete"
            }">
                ${isComplete ? "Mark as unread" : "Mark as read"}
            </button>
            <button data-testid="bookItemDeleteButton" class="action-button delete">Delete</button>
            <button data-testid="bookItemEditButton" class="action-button edit">Edit</button>
        </div>
    `;

  // Menambahkan buku baru ke daftar yang sesuai
  if (isComplete) {
    completeBookList.appendChild(bookItem);
  } else {
    incompleteBookList.appendChild(bookItem);
  }

  // Menyimpan buku ke localStorage
  saveBooks();

  // Mengosongkan formulir setelah buku ditambahkan
  bookForm.reset();
});

// Fungsi untuk menghapus buku
function deleteBook(bookItem) {
  bookItem.remove();
  saveBooks();
}

// Fungsi untuk mencari buku
function searchBooks(query) {
  const allBooks = document.querySelectorAll('[data-testid="bookItem"]');
  allBooks.forEach((book) => {
    const title = book
      .querySelector('[data-testid="bookItemTitle"]')
      .innerText.toLowerCase();
    if (title.includes(query.toLowerCase())) {
      book.style.display = "flex";
    } else {
      book.style.display = "none";
    }
  });
}

// Event listener untuk form pencarian
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const query = document.getElementById("searchBookTitle").value.trim();
  searchBooks(query);
});

// Event listener untuk input pencarian (real-time search)
document
  .getElementById("searchBookTitle")
  .addEventListener("input", function () {
    const query = this.value.trim();
    searchBooks(query);
  });

// Fungsi untuk memindahkan buku dari "Unread" ke "Read"
function moveToComplete(bookItem) {
  const title = bookItem.querySelector(
    '[data-testid="bookItemTitle"]'
  ).innerText;
  const author = bookItem
    .querySelector('[data-testid="bookItemAuthor"]')
    .innerText.replace("by ", "");
  const year = bookItem.querySelector('[data-testid="bookItemYear"]').innerText;
  const bookId = bookItem.getAttribute("data-bookid");

  const newBookItem = document.createElement("div");
  newBookItem.setAttribute("data-bookid", bookId);
  newBookItem.setAttribute("data-testid", "bookItem");
  newBookItem.className = "book-card";
  newBookItem.innerHTML = `
        <div class="book-info">
            <h3 data-testid="bookItemTitle" class="book-title">${title}</h3>
            <p data-testid="bookItemAuthor" class="book-meta">by ${author}</p>
            <p data-testid="bookItemYear" class="book-meta">${year}</p>
        </div>
        <div class="book-actions">
            <button data-testid="bookItemIsCompleteButton" class="action-button incomplete">Mark as unread</button>
            <button data-testid="bookItemDeleteButton" class="action-button delete">Delete</button>
            <button data-testid="bookItemEditButton" class="action-button edit">Edit</button>
        </div>
    `;

  completeBookList.appendChild(newBookItem);
  deleteBook(bookItem);
}

// Fungsi untuk memindahkan buku dari "Read" ke "Unread"
function moveToIncomplete(bookItem) {
  const title = bookItem.querySelector(
    '[data-testid="bookItemTitle"]'
  ).innerText;
  const author = bookItem
    .querySelector('[data-testid="bookItemAuthor"]')
    .innerText.replace("by ", "");
  const year = bookItem.querySelector('[data-testid="bookItemYear"]').innerText;
  const bookId = bookItem.getAttribute("data-bookid");

  const newBookItem = document.createElement("div");
  newBookItem.setAttribute("data-bookid", bookId);
  newBookItem.setAttribute("data-testid", "bookItem");
  newBookItem.className = "book-card";
  newBookItem.innerHTML = `
        <div class="book-info">
            <h3 data-testid="bookItemTitle" class="book-title">${title}</h3>
            <p data-testid="bookItemAuthor" class="book-meta">by ${author}</p>
            <p data-testid="bookItemYear" class="book-meta">${year}</p>
        </div>
        <div class="book-actions">
            <button data-testid="bookItemIsCompleteButton" class="action-button complete">Mark as read</button>
            <button data-testid="bookItemDeleteButton" class="action-button delete">Delete</button>
            <button data-testid="bookItemEditButton" class="action-button edit">Edit</button>
        </div>
    `;

  incompleteBookList.appendChild(newBookItem);
  deleteBook(bookItem);
}

// Event delegation untuk tombol aksi
function handleBookActions(event) {
  const bookItem = event.target.closest('[data-testid="bookItem"]');

  if (event.target.matches('[data-testid="bookItemDeleteButton"]')) {
    deleteBook(bookItem);
  } else if (event.target.matches('[data-testid="bookItemIsCompleteButton"]')) {
    if (bookItem.parentElement.id === "incompleteBookList") {
      moveToComplete(bookItem);
    } else {
      moveToIncomplete(bookItem);
    }
  } else if (event.target.matches('[data-testid="bookItemEditButton"]')) {
    editBook(bookItem);
  }
}

incompleteBookList.addEventListener("click", handleBookActions);
completeBookList.addEventListener("click", handleBookActions);

// Fungsi untuk mengedit buku
function editBook(bookItem) {
  const title = bookItem.querySelector(
    '[data-testid="bookItemTitle"]'
  ).innerText;
  const author = bookItem
    .querySelector('[data-testid="bookItemAuthor"]')
    .innerText.replace("by ", "");
  const year = bookItem.querySelector('[data-testid="bookItemYear"]').innerText;

  // Isi form dengan data buku yang akan diedit
  document.getElementById("bookFormTitle").value = title;
  document.getElementById("bookFormAuthor").value = author;
  document.getElementById("bookFormYear").value = year;

  // Hapus buku lama
  deleteBook(bookItem);

  // Scroll ke form
  document.getElementById("bookForm").scrollIntoView({ behavior: "smooth" });
}

// Memuat buku dari localStorage saat aplikasi dimuat
function loadBooks() {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  books.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.setAttribute("data-bookid", book.id);
    bookItem.setAttribute("data-testid", "bookItem");
    bookItem.className = "book-card";
    bookItem.innerHTML = `
            <div class="book-info">
                <h3 data-testid="bookItemTitle" class="book-title">${
                  book.title
                }</h3>
                <p data-testid="bookItemAuthor" class="book-meta">by ${
                  book.author
                }</p>
                <p data-testid="bookItemYear" class="book-meta">${book.year}</p>
            </div>
            <div class="book-actions">
                <button data-testid="bookItemIsCompleteButton" class="action-button ${
                  book.isComplete ? "incomplete" : "complete"
                }">
                    ${book.isComplete ? "Mark as unread" : "Mark as read"}
                </button>
                <button data-testid="bookItemDeleteButton" class="action-button delete">Delete</button>
                <button data-testid="bookItemEditButton" class="action-button edit">Edit</button>
            </div>
        `;

    if (book.isComplete) {
      completeBookList.appendChild(bookItem);
    } else {
      incompleteBookList.appendChild(bookItem);
    }
  });
}

document.addEventListener("DOMContentLoaded", loadBooks);
