let currentBook = null;

// Показ модального окна с информацией о книге
function showBookModal(title, author, price, image) {
    currentBook = {
        id: title.replace(/\s+/g, '-').toLowerCase(),
        title,
        author,
        price,
        image
    };
    
    document.getElementById('modalBookTitle').textContent = title;
    document.getElementById('modalBookAuthor').textContent = author;
    document.getElementById('modalBookPrice').textContent = price;
    document.getElementById('bookModal').style.display = 'block';
}

// Закрытие модального окна
function closeModal() {
    document.getElementById('bookModal').style.display = 'none';
}

// Добавление в корзину
function addToCart() {
    if (!currentBook) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Проверяем, нет ли уже этой книги в корзине
    if (!cart.some(item => item.id === currentBook.id)) {
        cart.push(currentBook);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter();
        alert(`"${currentBook.title}" добавлена в корзину`);
    } else {
        alert('Эта книга уже в корзине');
    }
    
    closeModal();
}

// Обновление счетчика корзины
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const counters = document.querySelectorAll('#cartCounter');
    counters.forEach(counter => {
        counter.textContent = cart.length;
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCartCounter();
    
    // Закрытие модального окна при клике вне его
    window.onclick = function(event) {
        if (event.target === document.getElementById('bookModal')) {
            closeModal();
        }
    };
});