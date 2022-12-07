var gTrans={
    title: {
        en: 'MY BOOKSHOOP',
        he: 'חנות ספרים - ניהול מלאי'
    },
    'filter-rate': {
        en: '⭐ rate:',
        he: 'דירוג  ⭐:',
    },
    'filter-price': {
        en: 'max price:',
        he: 'מחיר מקסימלי:'
    },
    'td-id':{
        en: 'id',
        he: 'מספר מזהה'
    },
    'td-img':{
        en: 'Img',
        he: 'תמונה'
    },
    'td-title':{
        en: 'Title',
        he: 'שם הספר'
    },
    'td-price':{
        en: 'Price',
        he: 'מחיר'
    },
    'modal-rate':{
        en: 'Book Rate:',
        he: 'דירוג:'
    },
    'modal-close':{
        en: 'Close',
        he: 'סגירה'
    },
    'create-book':{
        en: 'Create new book',
        he: 'הוסף ספר'
    },
    'btn-read':{
        en: 'Read',
        he: 'מידע'
    },
    'btn-update':{
        en: 'Update',
        he: 'עדכון'
    },
    'btn-delete':{
        en: 'Delete',
        he: 'מחיקה'
    },
    price:{
        en: 'What is the new price?',
        he: 'מה המחיר החדש?'
    },
    'next-page':{
        en: 'next',
        he: 'דף הבא'
    },
    'prev-page':{
        en: 'prev',
        he: 'דף קודם'
    },
    'new-book-name':{
        en: 'Enter book name',
        he: 'שם הספר'
    },
    'new-book-price':{
        en: 'Enter book price',
        he: 'מחיר הספר'
    },
    all:{
        en: 'All',
        he: 'הצג הכל'
    },
}

var gCurrLang = 'en'

function getTrans(transKey) {
    // done: if key is unknown return 'UNKNOWN'
    const key = gTrans[transKey]
    if (!key) return 'UNKNOWN'

    // done: get from gTrans
    var translation = key[gCurrLang]

    // done: If translation not found - use english
    if (!translation) translation = key.en

    return translation
}

function doTrans() {
    // var els = document.querySelectorAll('[data-trans]'
    // for each el:
    //    get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const translation = getTrans(transKey)

        el.innerText = translation

        // done: support placeholder    
        if (el.placeholder) el.placeholder = translation
    })
}

function setLang(lang) {
    gCurrLang = lang
}

function getLang(){
    return gCurrLang
}