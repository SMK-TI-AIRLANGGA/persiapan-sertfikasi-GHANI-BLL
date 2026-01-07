function searchBooks() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const bookItems = document.getElementsByClassName('book-item');
    const noResultMsg = document.getElementById('no-result-message');
    
    let foundCount = 0;

    for (let i = 0; i < bookItems.length; i++) {
        const title = bookItems[i].querySelector('.book-title').textContent.toLowerCase();
        
        const metaElements = bookItems[i].querySelectorAll('.book-meta');
        let metaText = "";
        metaElements.forEach(el => metaText += el.textContent.toLowerCase() + " ");
        
        if (title.includes(filter) || metaText.includes(filter)) {
            bookItems[i].style.display = ""; 
            foundCount++; 
        } else {
            bookItems[i].style.display = "none"; 
        }
    }

    if (foundCount === 0) {
        noResultMsg.style.display = "block";
    } else {
        noResultMsg.style.display = "none";
    }
}