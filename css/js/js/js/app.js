class TelegramStarsApp {
    constructor() {
        this.tg = window.Telegram.WebApp;
        this.initApp();
        this.setupEventListeners();
    }

    initApp() {
        // Expand the Web App to full viewport
        this.tg.expand();
        
        // Set theme colors based on Telegram settings
        this.setTheme();
        
        // Setup back button
        this.setupBackButton();
    }

    setTheme() {
        const themeParams = this.tg.themeParams;
        document.documentElement.style.setProperty('--primary-color', themeParams.button_color || '#0088cc');
        document.documentElement.style.setProperty('--background-color', themeParams.bg_color || '#0e1621');
        document.documentElement.style.setProperty('--text-color', themeParams.text_color || '#ffffff');
    }

    setupBackButton() {
        // Show back button when needed
        this.tg.BackButton.show();
        this.tg.BackButton.onClick(() => {
            this.tg.close();
        });
    }

    setupEventListeners() {
        // Get Stars button
        document.getElementById('get-stars-btn').addEventListener('click', () => {
            this.tg.showPopup({
                title: 'Получить Stars',
                message: 'Подпишитесь на каналы, чтобы получить бесплатные Stars',
                buttons: [
                    {id: 'subscribe', type: 'default', text: 'Подписаться'},
                    {type: 'cancel'}
                ]
            }, (buttonId) => {
                if (buttonId === 'subscribe') {
                    this.tg.showAlert('Вы успешно подписались! Stars будут начислены в течение 24 часов.');
                }
            });
        });

        // Handle theme changes
        this.tg.onEvent('themeChanged', this.setTheme.bind(this));
    }
}

// Initialize the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new TelegramStarsApp();
});
