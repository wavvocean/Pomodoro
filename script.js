let timeLeft = 25 * 60;
let timerId = null;
let isRunning = false;
let currentMode = 'work';
let sessionCount = 1;

const modes = {
    work: { duration: 25 * 60, label: 'Praca' },
    short: { duration: 5 * 60, label: 'Krótka przerwa' },
    long: { duration: 15 * 60, label: 'Długa przerwa' }
};

const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const sessionLabel = document.getElementById('session-label');
const sessionCountEl = document.getElementById('session-count');
const modeButtons = document.querySelectorAll('.mode-btn');

// Prośba o uprawnienia do powiadomień
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    timerEl.textContent = formatTime(timeLeft);
}

function showNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification(title, {
            body: body,
            icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23667eea"/></svg>',
            badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23667eea"/></svg>'
        });

        // Odtwórz dźwięk (opcjonalne)
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE');
        audio.play().catch(() => {});
        
        setTimeout(() => notification.close(), 5000);
    }
}

function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    startBtn.textContent = 'Pauza';
    
    // Zmień tło na czarne gdy zaczyna się praca
    if (currentMode === 'work') {
        document.body.classList.add('work-mode');
    }
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft === 0) {
            clearInterval(timerId);
            isRunning = false;
            startBtn.textContent = 'Start';
            
            if (currentMode === 'work') {
                sessionCount++;
                sessionCountEl.textContent = sessionCount;
                showNotification('Czas na przerwę!', 'Dobra robota! Zrób sobie przerwę.');
            } else {
                showNotification('Przerwa zakończona!', 'Czas wracać do pracy!');
            }
            
            // Automatyczne przełączenie trybu
            if (currentMode === 'work') {
                setMode(sessionCount % 4 === 0 ? 'long' : 'short');
            } else {
                setMode('work');
            }
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'Start';
    
    // Przywróć jasne tło gdy timer jest zatrzymany
    if (currentMode === 'work') {
        document.body.classList.remove('work-mode');
    }
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'Start';
    timeLeft = modes[currentMode].duration;
    updateDisplay();
}

function setMode(mode) {
    currentMode = mode;
    timeLeft = modes[mode].duration;
    sessionLabel.textContent = modes[mode].label;
    updateDisplay();
    
    if (isRunning) {
        pauseTimer();
    }
    
    // Usuń tryb pracy gdy zmienia się na przerwę
    if (mode !== 'work') {
        document.body.classList.remove('work-mode');
    }
    
    // Animacja aktywnego przycisku
    modeButtons.forEach(btn => {
        if (btn.dataset.mode === mode) {
            btn.classList.add('bg-white', 'bg-opacity-30');
        } else {
            btn.classList.remove('bg-white', 'bg-opacity-30');
        }
    });
}

// Event listeners
startBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);

modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        setMode(btn.dataset.mode);
    });
});

// Inicjalizacja
updateDisplay();
setMode('work');

// Obsługa widoczności strony
document.addEventListener('visibilitychange', () => {
    if (document.hidden && isRunning) {
        // Timer działa w tle
    }
});

// Prośba o uprawnienia po kliknięciu start
startBtn.addEventListener('click', () => {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}, { once: true });