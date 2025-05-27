document.addEventListener('DOMContentLoaded', function() {
    // Бургер-меню
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            burger.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Фильтрация работ
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.work-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            workCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Модальное окно для работ
    const workModal = document.getElementById('work-modal');
    const modalClose = document.querySelectorAll('.modal__close');
    
    // Обработчики для карточек работ
    workCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Проверяем, что клик был не по ссылке внутри карточки
            if (e.target.tagName !== 'A') {
                const imgSrc = this.querySelector('.work-card__image').src;
                const title = this.querySelector('.work-card__title').textContent;
                const category = this.querySelector('.work-card__category').textContent;
                const description = this.querySelector('.work-card__description').textContent;
                const date = this.querySelector('.work-card__date').textContent;
                
                workModal.querySelector('.modal__image').src = imgSrc;
                workModal.querySelector('.modal__title').textContent = title;
                workModal.querySelector('.modal__category').textContent = category;
                workModal.querySelector('.modal__description').textContent = description;
                workModal.querySelector('.modal__date').textContent = date;
                
                workModal.classList.add('active');
            }
        });
    });
    
    // Закрытие модальных окон
    modalClose.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
        });
    });
    
    // Закрытие при клике вне контента
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Закрытие на Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
    
    // Открытие политики конфиденциальности
    document.getElementById('privacy-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('privacy-modal').classList.add('active');
    });
});