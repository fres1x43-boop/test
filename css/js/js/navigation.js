class NavigationManager {
    constructor() {
        this.tg = window.Telegram.WebApp;
        this.currentTab = 'main';
        this.initNavigation();
        this.initTabs();
    }

    initNavigation() {
        const navItems = [
            { id: 'main', icon: '🏠', text: 'Главная' },
            { id: 'weekly', icon: '📅', text: 'Неделя' },
            { id: 'jackpot', icon: '🎰', text: 'Джекпот' },
            { id: 'upgrade', icon: '⬆️', text: 'Апгрейд' },
            { id: 'profile', icon: '👤', text: 'Профиль' }
        ];

        const navContainer = document.getElementById('app-navigation');
        navContainer.innerHTML = navItems.map(item => `
            <div class="nav-item ${item.id === this.currentTab ? 'active' : ''}" data-id="${item.id}">
                <span class="nav-icon">${item.icon}</span>
                <span>${item.text}</span>
            </div>
        `).join('');

        // Add click handlers
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => this.handleNavClick(item.dataset.id));
        });
    }

    initTabs() {
        const tabs = [
            { id: 'all', text: 'Все' },
            { id: 'free', text: 'Бесплатные' },
            { id: 'new', text: 'Новые' },
            { id: 'cheap', text: 'Дешевые' },
            { id: 'expensive', text: 'Дорогие' }
        ];

        const tabsContainer = document.getElementById('tabs-container');
        tabsContainer.innerHTML = tabs.map(tab => `
            <button class="tab ${tab.id === 'free' ? 'active' : ''}" data-id="${tab.id}">${tab.text}</button>
        `).join('');

        // Add click handlers
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => this.handleTabClick(tab.dataset.id));
        });
    }

    handleNavClick(id) {
        this.currentTab = id;
        
        // Update active state
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.id === id);
        });

        // Here you would typically load different content based on the tab
        console.log(`Navigated to ${id}`);
    }

    handleTabClick(id) {
        // Update active state
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.id === id);
        });

        // Here you would typically filter content based on the tab
        console.log(`Filtered by ${id}`);
    }
}

// Initialize navigation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});
