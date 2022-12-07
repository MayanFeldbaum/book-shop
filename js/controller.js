'use strict'

function onInit() {
    renderFilterByQueryStringParams()
    renderBooks()
    doTrans()
}

function renderBooks() {
    var books = getBooks()
    const strHTMLs = books.map(book => {
        return `<tr>
            <td>${book.id}</td>
            <td>${book.img}</td>
            <td>${book.title}</td>
            <td>${formatCurrency(book.price)}</td>
            <td><button class="btn-read" data-trans="btn-read" onclick="onReadBook('${book.id}')">Read</button>
            <td><button class="btn-update" data-trans="btn-update" onclick="onUpdateBook('${book.id}')">Update</button>
            <td><button class="btn-delete" data-trans="btn-delete" onclick="onDeleteBook('${book.id}')">Delete</button>
            </tr>`

    })
    document.querySelector('tbody').innerHTML = strHTMLs.join('')
    doTrans()

}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function onAddBook() {
    var bookName = prompt(getTrans('new-book-name'))
    var bookPrice = +prompt(getTrans('new-book-price'))
    if(!bookName||!bookPrice)return
    addBook(bookName, bookPrice)
    renderBooks()
}

function onUpdateBook(bookId) {
    var bookPrice = +prompt(getTrans('price'))

    if (!bookPrice) return
    updateBook(bookId, bookPrice)
    renderBooks()
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    const id = bookId
    var elModal = document.querySelector('.modal1')
    elModal.querySelector('h3').innerText = book.title
    elModal.querySelector('h4').innerText = `${formatCurrency(book.price)}`
    elModal.classList.add('open')

    const plus = document.querySelector(".plus")
    plus.innerHTML = `<button onClick="changeRateUp('${id}')" class="plus">+</button>`
    const minus = document.querySelector(".minus")
    minus.innerHTML = `<button onClick="changeRateDown('${id}')" class="minus">-</button>`
    const num = document.querySelector(".num")
    num.innerHTML = book.rate
}

function onCloseModal() {

    document.querySelector('.modal1').classList.remove('open')
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
        maxPrice: +queryStringParams.get('maxPrice') || 100,
        minRate: +queryStringParams.get('minRate') || 0,
    }
    const langBy = {
        lang: queryStringParams.get('lang') || 'en',
    }
    if(!filterBy.maxPrice&&!filterBy.minRate) return

    document.querySelector('.filter-rate-select').value = filterBy.minRate
    document.querySelector('.filter-price-range').value = filterBy.maxPrice
    onSetFilterBy(filterBy)
    document.querySelector('.filter-lang-select').value = langBy.lang
    onSetLang(langBy.lang)
}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    renderQueryStringParams()
    renderBooks()
   document.querySelector('.filter-price-show').innerText=filterBy.maxPrice
}

function onSetLang(lang) {
    setLang(lang)
    renderQueryStringParams()
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans()
}

function renderQueryStringParams(){
    var lang = getLang()
    var filterBy = getBookFilter()
    renderBooks()

    const queryStringParams = `?lang=${lang}&maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onNextPage() {
    nextPage()
    renderBooks()
}

function onPrevPage() {
    prevPage()
    renderBooks()
}

function formatCurrency(num) {
    if (getLang()==='he') return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num)
    else return new Intl.NumberFormat('en',{ style: 'currency',currency:'USD'}).format(num)
}