class UserManager {
    constructor() {
        this.tg = window.Telegram.WebApp;
        this.initUser();
    }

    initUser() {
        const user = this.tg.initDataUnsafe?.user;
        const userContainer = document.getElementById('user-container');
        const usernameElement = document.getElementById('username');
        const avatarElement = document.getElementById('user-avatar');

        if (user) {
            // Set username
            usernameElement.textContent = user.first_name || 'Пользователь';
            
            // Set avatar if available
            if (user.photo_url) {
                avatarElement.src = user.photo_url;
            } else {
                // Generate default avatar with initials
                this.setDefaultAvatar(user, avatarElement);
            }
            
            // Add click handler for user container
            userContainer.addEventListener('click', () => this.showUserProfile());
        } else {
            // Guest mode
            usernameElement.textContent = 'Гость';
            avatarElement.src = 'https://via.placeholder.com/40';
        }
    }

    setDefaultAvatar(user, element) {
        const name = user.first_name || 'U';
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF3'];
        const color = colors[name.charCodeAt(0) % colors.length];
        
        const canvas = document.createElement('canvas');
        canvas.width = 40;
        canvas.height = 40;
        const ctx = canvas.getContext('2d');
        
        // Draw background
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw initial
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(name.charAt(0).toUpperCase(), canvas.width/2, canvas.height/2);
        
        element.src = canvas.toDataURL();
    }

    showUserProfile() {
        this.tg.showPopup({
            title: 'Профиль',
            message: 'Здесь будет информация о вашем профиле и балансе Stars',
            buttons: [
                {id: 'close', type: 'default', text: 'Закрыть'}
            ]
        });
    }
}

// Initialize user manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UserManager();
});
