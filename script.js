// Data buku
const booksData = [
    {
        id: 1,
        title: "Laskar Pelangi",
        author: "Andrea Hirata",
        borrower: "Budi Santoso",
        borrowDate: "1 Januari 2026",
        dueDate: "15 Januari 2026",
        status: "dipinjam",
        category: "Fiksi"
    },
    {
        id: 2,
        title: "Bumi Manusia",
        author: "Pramoedya Ananta Toer",
        borrower: "Siti Nurhaliza",
        borrowDate: "28 Desember 2025",
        dueDate: "11 Januari 2026",
        status: "dipinjam",
        category: "Sejarah"
    },
    {
        id: 3,
        title: "Ronggeng Dukuh Paruk",
        author: "Ahmad Tohari",
        borrower: "Ahmad Dahlan",
        borrowDate: "20 Desember 2025",
        returnDate: "3 Januari 2026",
        status: "kembali",
        category: "Fiksi"
    },
    {
        id: 4,
        title: "Pulang",
        author: "Tere Liye",
        borrower: "Dewi Lestari",
        borrowDate: "3 Januari 2026",
        dueDate: "17 Januari 2026",
        status: "dipinjam",
        category: "Fiksi"
    },
    {
        id: 5,
        title: "Negeri 5 Menara",
        author: "Ahmad Fuadi",
        borrower: "Rina Wijaya",
        borrowDate: "5 Januari 2026",
        dueDate: "19 Januari 2026",
        status: "dipinjam",
        category: "Inspirasi"
    },
    {
        id: 6,
        title: "Perahu Kertas",
        author: "Dee Lestari",
        borrower: "Andi Setiawan",
        borrowDate: "25 Desember 2025",
        returnDate: "8 Januari 2026",
        status: "kembali",
        category: "Romance"
    }
];

// Katalog buku untuk halaman Katalog Buku
const catalogBooks = [
    { id: 1, title: "Laskar Pelangi", author: "Andrea Hirata", year: "2005", stock: 3, category: "Fiksi" },
    { id: 2, title: "Bumi Manusia", author: "Pramoedya Ananta Toer", year: "1980", stock: 2, category: "Sejarah" },
    { id: 3, title: "Ronggeng Dukuh Paruk", author: "Ahmad Tohari", year: "1982", stock: 4, category: "Fiksi" },
    { id: 4, title: "Pulang", author: "Tere Liye", year: "2015", stock: 5, category: "Fiksi" },
    { id: 5, title: "Negeri 5 Menara", author: "Ahmad Fuadi", year: "2009", stock: 3, category: "Inspirasi" },
    { id: 6, title: "Perahu Kertas", author: "Dee Lestari", year: "2009", stock: 4, category: "Romance" },
    { id: 7, title: "Sang Pemimpi", author: "Andrea Hirata", year: "2006", stock: 3, category: "Fiksi" },
    { id: 8, title: "Hafalan Shalat Delisa", author: "Tere Liye", year: "2005", stock: 2, category: "Inspirasi" },
    { id: 9, title: "Ayat-Ayat Cinta", author: "Habiburrahman El Shirazy", year: "2004", stock: 4, category: "Romance" },
    { id: 10, title: "Filosofi Kopi", author: "Dee Lestari", year: "2006", stock: 5, category: "Fiksi" }
];

// State management
let currentPage = 'home';
let filteredBooks = [...booksData];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    setupSearch();
    renderBooks();
    showPage('peminjaman'); // Default page
});

// Setup Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('href').substring(1);
            showPage(page);
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Show different pages
function showPage(page) {
    currentPage = page;
    const mainContent = document.querySelector('.main-content');
    
    switch(page) {
        case 'home':
            mainContent.innerHTML = getHomePage();
            break;
        case 'books':
            mainContent.innerHTML = getBooksPage();
            setupCatalogSearch();
            break;
        case 'peminjaman':
            mainContent.innerHTML = getPeminjamanPage();
            setupSearch();
            renderBooks();
            break;
        case 'about':
            mainContent.innerHTML = getAboutPage();
            break;
        default:
            mainContent.innerHTML = getPeminjamanPage();
            setupSearch();
            renderBooks();
    }
}

// Home Page
function getHomePage() {
    return `
        <div class="hero-section">
            <h1 class="hero-title">Selamat Datang di Perpustakaan Digital</h1>
            <p class="hero-subtitle">Temukan ribuan koleksi buku berkualitas untuk menambah wawasan Anda</p>
            <div class="hero-stats">
                <div class="stat-card">
                    <div class="stat-number">10,000+</div>
                    <div class="stat-label">Koleksi Buku</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">5,000+</div>
                    <div class="stat-label">Anggota Aktif</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">24/7</div>
                    <div class="stat-label">Akses Online</div>
                </div>
            </div>
        </div>
        
        <div class="features">
            <div class="feature-card">
                <div class="feature-icon">📚</div>
                <h3 class="feature-title">Koleksi Lengkap</h3>
                <p class="feature-desc">Ribuan buku dari berbagai kategori tersedia untuk Anda</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">⏰</div>
                <h3 class="feature-title">Peminjaman Mudah</h3>
                <p class="feature-desc">Proses peminjaman cepat dan praktis secara online</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🔔</div>
                <h3 class="feature-title">Notifikasi</h3>
                <p class="feature-desc">Dapatkan pengingat sebelum tanggal jatuh tempo</p>
            </div>
        </div>
    `;
}

// Books Catalog Page
function getBooksPage() {
    return `
        <h1 class="page-title">Katalog Buku</h1>
        
        <div class="search-container">
            <div class="search-box">
                <input type="text" id="catalogSearch" placeholder="🔍 Cari buku berdasarkan judul atau penulis..." class="search-input">
                <select id="categoryFilter" class="category-filter">
                    <option value="">Semua Kategori</option>
                    <option value="Fiksi">Fiksi</option>
                    <option value="Sejarah">Sejarah</option>
                    <option value="Romance">Romance</option>
                    <option value="Inspirasi">Inspirasi</option>
                </select>
            </div>
        </div>

        <div class="books-container">
            <div class="catalog-grid" id="catalogGrid">
                ${renderCatalog()}
            </div>
        </div>
    `;
}

// Render Catalog
function renderCatalog(searchTerm = '', category = '') {
    let filtered = catalogBooks;
    
    if (searchTerm) {
        filtered = filtered.filter(book => 
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    if (category) {
        filtered = filtered.filter(book => book.category === category);
    }
    
    if (filtered.length === 0) {
        return '<div class="no-results">Tidak ada buku yang ditemukan</div>';
    }
    
    return filtered.map(book => `
        <div class="catalog-card">
            <div class="catalog-book-cover">${book.title.substring(0, 1)}</div>
            <div class="catalog-info">
                <h3 class="catalog-title">${book.title}</h3>
                <p class="catalog-author">✍️ ${book.author}</p>
                <p class="catalog-year">📅 Tahun: ${book.year}</p>
                <p class="catalog-category">🏷️ ${book.category}</p>
                <div class="catalog-footer">
                    <span class="stock-badge ${book.stock > 0 ? 'in-stock' : 'out-stock'}">
                        ${book.stock > 0 ? `Tersedia: ${book.stock}` : 'Habis'}
                    </span>
                    <button class="btn-borrow" onclick="borrowBook(${book.id})" ${book.stock === 0 ? 'disabled' : ''}>
                        Pinjam
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup Catalog Search
function setupCatalogSearch() {
    const searchInput = document.getElementById('catalogSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const catalogGrid = document.getElementById('catalogGrid');
            catalogGrid.innerHTML = renderCatalog(this.value, categoryFilter.value);
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const catalogGrid = document.getElementById('catalogGrid');
            catalogGrid.innerHTML = renderCatalog(searchInput.value, this.value);
        });
    }
}

// Peminjaman Page
function getPeminjamanPage() {
    return `
        <h1 class="page-title">Daftar Buku Peminjam</h1>
        
        <div class="search-container">
            <div class="search-box">
                <input type="text" id="searchInput" placeholder="🔍 Cari berdasarkan judul, penulis, atau peminjam..." class="search-input">
                <select id="statusFilter" class="status-filter">
                    <option value="">Semua Status</option>
                    <option value="dipinjam">Dipinjam</option>
                    <option value="kembali">Sudah Dikembalikan</option>
                </select>
            </div>
        </div>

        <div class="books-container">
            <h2 class="section-title">Buku yang Dipinjam</h2>
            <div class="book-list" id="bookList"></div>
        </div>
    `;
}

// About Page
function getAboutPage() {
    return `
        <h1 class="page-title">Tentang Perpustakaan Digital</h1>
        
        <div class="about-container">
            <div class="about-content">
                <div class="about-section">
                    <h2 class="about-subtitle">Visi Kami</h2>
                    <p>Menjadi perpustakaan digital terdepan yang memberikan akses mudah dan berkualitas ke berbagai koleksi buku untuk meningkatkan literasi masyarakat Indonesia.</p>
                </div>
                
                <div class="about-section">
                    <h2 class="about-subtitle">Misi Kami</h2>
                    <ul class="about-list">
                        <li>Menyediakan akses ke ribuan koleksi buku berkualitas</li>
                        <li>Memudahkan proses peminjaman dan pengembalian buku</li>
                        <li>Meningkatkan minat baca masyarakat melalui teknologi digital</li>
                        <li>Memberikan layanan perpustakaan yang modern dan efisien</li>
                    </ul>
                </div>
                
                <div class="about-section">
                    <h2 class="about-subtitle">Hubungi Kami</h2>
                    <div class="contact-info">
                        <p>📧 Email: ghanizen30@gmail.com</p>
                        <p>📞 Telepon: 0823-5088-9069</p>
                        <p>📍 Alamat: Jl. Pahlawan No.2A Samarinda</p>
                        <p>⏰ Jam Operasional: Senin - Jumat (08:00 - 17:00)</p>
                    </div>
                </div>
            </div>
            
            <div class="team-section">
                <h2 class="about-subtitle">Tim Kami</h2>
                <div class="team-grid">
                    <div class="team-card">
                        <div class="team-avatar">👨‍💼</div>
                        <h3>Ahmad Fauzi</h3>
                        <p>Kepala Perpustakaan</p>
                    </div>
                    <div class="team-card">
                        <div class="team-avatar">👩‍💼</div>
                        <h3>Siti Rahma</h3>
                        <p>Koordinator Layanan</p>
                    </div>
                    <div class="team-card">
                        <div class="team-avatar">👨‍💻</div>
                        <h3>Budi Prakoso</h3>
                        <p>IT Support</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Setup Search
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterBooks(this.value, statusFilter ? statusFilter.value : '');
        });
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterBooks(searchInput ? searchInput.value : '', this.value);
        });
    }
}

// Filter Books
function filterBooks(searchTerm, status) {
    filteredBooks = booksData.filter(book => {
        const matchesSearch = 
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.borrower.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = status === '' || book.status === status;
        
        return matchesSearch && matchesStatus;
    });
    
    renderBooks();
}

// Render Books
function renderBooks() {
    const bookList = document.getElementById('bookList');
    if (!bookList) return;
    
    if (filteredBooks.length === 0) {
        bookList.innerHTML = '<div class="no-results">Tidak ada buku yang ditemukan</div>';
        return;
    }
    
    bookList.innerHTML = filteredBooks.map(book => `
        <div class="book-item" data-id="${book.id}">
            <div class="book-cover">${book.title.substring(0, 1)}</div>
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-meta">✍️ Penulis: ${book.author}</div>
                <div class="book-meta">👤 Peminjam: ${book.borrower}</div>
                <div class="book-meta">📅 Tgl Pinjam: ${book.borrowDate}</div>
                <div class="book-meta">⏰ ${book.status === 'dipinjam' ? 'Jatuh Tempo: ' + book.dueDate : 'Dikembalikan: ' + book.returnDate}</div>
                <span class="book-status status-${book.status}">
                    ${book.status === 'dipinjam' ? 'Dipinjam' : 'Sudah Dikembalikan'}
                </span>
            </div>
            <div class="book-actions">
                ${book.status === 'dipinjam' ? `
                    <button class="btn btn-return" onclick="returnBook(${book.id})">Kembalikan</button>
                    <button class="btn btn-extend" onclick="extendBook(${book.id})">Perpanjang</button>
                ` : `
                    <button class="btn btn-extend" style="background: #d4af37;" onclick="borrowAgain(${book.id})">Pinjam Lagi</button>
                `}
            </div>
        </div>
    `).join('');
}

// Book Actions
function returnBook(id) {
    const book = booksData.find(b => b.id === id);
    if (book) {
        showNotification(`Buku "${book.title}" telah dikembalikan!`, 'success');
        book.status = 'kembali';
        book.returnDate = new Date().toLocaleDateString('id-ID');
        filterBooks(
            document.getElementById('searchInput')?.value || '',
            document.getElementById('statusFilter')?.value || ''
        );
    }
}

function extendBook(id) {
    const book = booksData.find(b => b.id === id);
    if (book) {
        showNotification(`Peminjaman buku "${book.title}" telah diperpanjang 7 hari!`, 'success');
    }
}

function borrowAgain(id) {
    const book = booksData.find(b => b.id === id);
    if (book) {
        showNotification(`Anda akan meminjam kembali buku "${book.title}"`, 'info');
    }
}

function borrowBook(id) {
    const book = catalogBooks.find(b => b.id === id);
    if (book && book.stock > 0) {
        showNotification(`Berhasil meminjam buku "${book.title}"!`, 'success');
        book.stock--;
        if (currentPage === 'books') {
            const catalogGrid = document.getElementById('catalogGrid');
            const searchInput = document.getElementById('catalogSearch');
            const categoryFilter = document.getElementById('categoryFilter');
            catalogGrid.innerHTML = renderCatalog(searchInput?.value || '', categoryFilter?.value || '');
        }
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notif-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}