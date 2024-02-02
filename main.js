const myLibrary = [];

const showAddBook = document.getElementById("showAddBook");
const bookDialog = document.getElementById("bookDialog");
const addBookButton = document.getElementById("addBookButton");

showAddBook.addEventListener("click", () => {
    bookDialog.showModal();
});

function Book(author, title, numPages, readStatus) {
    // the constructor...
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.readStatus = readStatus;
};

Book.prototype.toggleRead = function () {
    this.readStatus = !this.readStatus;
}

function toggleRead(index) {
    myLibrary[index].toggleRead();
    render();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    render();
}

function addBookToLibrary() {
    // do stuff here
    let author = document.getElementById("author").value;
    let title = document.getElementById("title").value;
    let numPages = document.getElementById("numPages").value;
    let readStatus = document.getElementById("readStatus").checked;
    let newBook = new Book(author, title, numPages, readStatus);
    myLibrary.push(newBook);
    render();
};

function render() {
    let libraryElement = document.querySelector("#library");
    libraryElement.innerHTML = ""; //to avoid duplication
    for (let i = 0; i < myLibrary.length; i++) {
        // console.log(myLibrary[i]);
        let book = myLibrary[i];
        let bookElement = document.createElement("div");
        bookElement.setAttribute("class", "book-card");
        bookElement.innerHTML = `
        <div class="card-header">
            <h3 class="title">${book.title}</h3>
            <h5 class="author">by ${book.author}</h5>
        </div>
        <div class="card-body">
            <p>${book.numPages} pages</p>
            <p class="read-status ${book.readStatus}">${book.readStatus ? "Read" : "Not Read Yet"}</p>
            <button class="remove-button" onclick="removeBook(${i})">Remove</button>
            <button class="toggle-read-button" onclick="toggleRead(${i})">Toggle Read</button>
        </div>
        `
        libraryElement.appendChild(bookElement);
    }
}

addBookButton.addEventListener("click", (event) => {
    event.preventDefault(); // We don't want to submit this fake form
    addBookToLibrary();
});

