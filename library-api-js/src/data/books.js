export let books = [
    { id: 1, title: "Book One", price: 1000, isAvailable: true },
    { id: 2, title: "Book Two", price: 2000, isAvailable: true },
    { id: 3, title: "Book Three", price: 3000, isAvailable: true }
];

let nextId = 4;

export function findBookById(id) {
    return books.find(b => b.id === id);
}

export function addBook(input) {
    const book = {
        id: nextId++,
        isAvailable: true,
        ...input
    };
    books.push(book);
    return book;
}

export function updateBook(id, changes) {
    const book = findBookById(id);
    if (!book) return null;
    if (changes.id) delete changes.id; 
    Object.assign(book, changes);
    return book;
}

export function removeBook(id) {
    const index = books.findIndex(book => book.id === id);
    if (index === -1) return false;
    books.splice(index, 1);
    return true;
}