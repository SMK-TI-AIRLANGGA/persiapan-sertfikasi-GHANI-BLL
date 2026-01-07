function searchBooks() {

    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    
    const bookList = document.querySelector('.book-list');
    const bookItems = bookList.getElementsByClassName('book-item');

    for (let i = 0; i < bookItems.length; i++) {
        const title = bookItems[i].querySelector('.book-title').textContent;
        const meta = bookItems[i].querySelector('.book-meta').textContent; 
        
        if (title.toLowerCase().indexOf(filter) > -1 || meta.toLowerCase().indexOf(filter) > -1) {
            bookItems[i].style.display = ""; 
        } else {
            bookItems[i].style.display = "none"; 
        }
    }
}