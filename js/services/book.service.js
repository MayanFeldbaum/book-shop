'use strict'

const STORAGE_KEY = 'booksDB'
const PAGE_SIZE = 3
var gBooks
var gFilterBy ={maxPrice:0, minRate:0}
var gPageIdx = 0

 _createBooks()

function getBooks(){

        var books = gBooks.filter(book => book.price<=gFilterBy.maxPrice&&
        book.rate>=gFilterBy.minRate)
    
        var startIdx = gPageIdx * PAGE_SIZE
        return books.slice(startIdx, startIdx + PAGE_SIZE)
}

function nextPage() {
    if (gPageIdx===0) return
    gPageIdx--
}

function prevPage() {
    if ((gPageIdx+1) * PAGE_SIZE >= gBooks.length)return
    gPageIdx++
}

function _createBook(title,price,img='<img src="img/book.jpg"') {
    return {
        id:''+title+price,
        title,
        price,
        rate:0,
        img,
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = [
            _createBook('Dora',89,'<img src="img/book.jpg"'),
            _createBook('Blippi',75,'<img src="img/book.jpg"'),
            _createBook('Cocomelon',62,'<img src="img/book.jpg"'),
        ]
    }
    gBooks = books
    saveToStorage(STORAGE_KEY, gBooks)
}

function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    saveToStorage(STORAGE_KEY, gBooks)
}

function addBook(bookName,BookPrice){
    const book= _createBook(bookName,BookPrice)
    gBooks.unshift(book)
    saveToStorage(STORAGE_KEY, gBooks)
}

function updateBook(bookId, bookPrice){
    const book = gBooks.find(book => bookId === book.id)
    if(bookPrice!==book.price) book.price = bookPrice
    else return
    saveToStorage(STORAGE_KEY, gBooks)
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function updateBookRate(bookId, num){
    var book = gBooks.find(book => bookId === book.id)
    book.rate = book.rate+num
    saveToStorage(STORAGE_KEY, gBooks)
}

function setBookFilter(filterBy = {}) {
    gPageIdx = 0
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    return gFilterBy
}

function getBookFilter(){
    return gFilterBy
}

