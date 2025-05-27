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
    const worksGrid = document.getElementById('works-grid');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            const workCards = document.querySelectorAll('.work-card');
            
            workCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Модальное окно
    const modal = document.getElementById('work-modal');
    const modalClose = document.querySelector('.modal__close');
    
    // Закрытие модального окна
    modalClose.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // Закрытие при клике вне контента
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
    
    // Закрытие на Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
    
    // Добавление работ в портфолио
    const works = [
        {
            id: 1,
            title: "Инфографика о пиве",
            category: "infographic",
            image: "images/works/Frame 1 (5).png",
            description: "Инфографика, представлено пиво, вкусное очень",
            date: "Май 2025"
        },
        {
            id: 2,
            title: "Дизайн приложения",
            category: "design",
            image: "images/works/avatar.jpg",
            description: "Концепт дизайна мобильного приложения для трекинга здоровья. Основной акцент на удобстве использования и визуальной иерархии элементов.",
            date: "Апрель 2023"
        },
        {
            id: 3,
            title: "Статистика COVID-19",
            category: "infographic",
            image: "images/works/avatar.jpg",
            description: "Визуализация статистики по распространению COVID-19 в разных странах мира. Использованы графики и диаграммы для наглядного представления данных.",
            date: "Март 2023"
        },
        {
            id: 4,
            title: "Брендинг кафе",
            category: "design",
            image: "images/works/avatar.jpg",
            description: "Разработка фирменного стиля для кофейни. Логотип, цветовая палитра, меню и упаковка в едином стиле.",
            date: "Февраль 2023"
        },
        {
            id: 5,
            title: "Как работает интернет",
            category: "infographic",
            image: "images/works/avatar.jpg",
            description: "Инфографика, объясняющая основные принципы работы интернета для новичков. Простым языком о сложных технологиях.",
            date: "Январь 2023"
        },
        {
            id: 6,
            title: "Иллюстрации для книги",
            category: "other",
            image: "images/works/avatar.jpg",
            description: "Серия иллюстраций для детской образовательной книги. Яркие, запоминающиеся образы, помогающие усвоить материал.",
            date: "Декабрь 2022"
        }
        
    ];
    
    // Функция для отображения работ
    function displayWorks() {
        worksGrid.innerHTML = '';
        
        works.forEach(work => {
            const workCard = document.createElement('div');
            workCard.className = 'work-card';
            workCard.setAttribute('data-category', work.category);
            
            workCard.innerHTML = `
                <img src="${work.image}" alt="${work.title}" class="work-card__image">
                <div class="work-card__info">
                    <h3 class="work-card__title">${work.title}</h3>
                    <span class="work-card__category">${getCategoryName(work.category)}</span>
                    <p class="work-card__description">${work.description}</p>
                    <a href="#" class="work-card__link" data-work-id="${work.id}">Подробнее <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            
            worksGrid.appendChild(workCard);
        });
        
        // Добавляем обработчики для кнопок "Подробнее"
        document.querySelectorAll('.work-card__link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const workId = parseInt(this.getAttribute('data-work-id'));
                openWorkModal(workId);
            });
        });
    }
    
    // Функция для получения читаемого названия категории
    function getCategoryName(category) {
        switch(category) {
            case 'infographic': return 'Инфографика';
            case 'design': return 'Дизайн';
            default: return 'Другое';
        }
    }
    
    // Функция для открытия модального окна с работой
    function openWorkModal(workId) {
        const work = works.find(w => w.id === workId);
        if (!work) return;
        
        const modalTitle = document.querySelector('.modal__title');
        const modalCategory = document.querySelector('.modal__category');
        const modalImage = document.querySelector('.modal__image');
        const modalDescription = document.querySelector('.modal__description');
        const modalDate = document.querySelector('.modal__date');
        
        modalTitle.textContent = work.title;
        modalCategory.textContent = getCategoryName(work.category);
        modalImage.src = work.image;
        modalImage.alt = work.title;
        modalDescription.innerHTML = work.description;
        modalDate.textContent = work.date;
        
        modal.classList.add('active');
    }
    
    // Инициализация
    displayWorks();
    
    // Для редактирования работ можно добавить в консоли:
    // window.works = works; 
    // Затем можно изменять массив works и вызывать displayWorks() для обновления
});