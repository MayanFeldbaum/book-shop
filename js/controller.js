'use strict'

function onInit() {
    renderFilterByQueryStringParams()
    renderBooks()
}

function renderBooks() {
    var books = getBooks()
    const strHTMLs = books.map(book => {
        return `<tr>
            <td>${book.id}</td>
            <td>${book.img}</td>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td><button class="btn-read" onclick="onReadBook('${book.id}')">Read</button>
            <td><button class="btn-update" onclick="onUpdateBook('${book.id}')">Update</button>
            <td><button class="btn-delete" onclick="onDeleteBook('${book.id}')">Delete</button>
            </tr>`

    })
    document.querySelector('tbody').innerHTML = strHTMLs.join('')
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function onAddBook() {
    var bookName = prompt('What is the book name?')
    var bookPrice = +prompt('What is the book price?')
    addBook(bookName, bookPrice)
    renderBooks()
}

function onUpdateBook(bookId) {
    var bookPrice = +prompt(`What is the new price for the book id ${bookId}?`)
    updateBook(bookId, bookPrice)
    renderBooks()
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    const id = bookId
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.title
    elModal.querySelector('h4 span').innerText = book.price
    elModal.classList.add('open')

    const plus = document.querySelector(".plus")
    plus.innerHTML = `<button onClick="changeRateUp(${id})" class="plus">+</button>`
    const minus = document.querySelector(".minus")
    minus.innerHTML = `<button onClick="changeRateDown(${id})" class="minus">-</button>`
    const num = document.querySelector(".num")
    num.innerHTML = book.rate
}

function onCloseModal() {

    document.querySelector('.modal').classList.remove('open')
}

function changeRateUp(bookId) {
    const id = bookId
    var book = getBookById(`${id}`)
    if (book.rate < 10) {
        updateBookRate(id, 1)
        renderBooks()
        const num = document.querySelector(".num")
        num.innerHTML = book.rate
    }
}

function changeRateDown(bookId) {
    const id = bookId
    var book = getBookById(`${id}`)
    if (book.rate > 0) {
        updateBookRate(id, -1)
        renderBooks()
        const num = document.querySelector(".num")
        num.innerHTML = book.rate
    }
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        maxPrice : +queryStringParams.get('maxPrice') || '',
        minRate : +queryStringParams.get('minRate') || 0
    }

    if (!filterBy.maxPrice && !filterBy.minRate) return

    document.querySelector('.filter-rate-select').value = filterBy.maxPrice
    document.querySelector('.filter-price-range').value = filterBy.minRate
    setBookFilter(filterBy)
}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    renderBooks()
    
    const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)

}

function onNextPage() {
    nextPage()
    renderBooks()
}
