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
const progressRing = document.getElementById('progress-ring');

const ringCircumference = 2 * Math.PI * 115;
let totalTime = 25 * 60;

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
    updateProgressRing();
}

function updateProgressRing() {
    const progress = timeLeft / totalTime;
    const offset = ringCircumference * (1 - progress);
    progressRing.style.strokeDashoffset = offset;
}

function showNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification(title, {
            body: body,
            icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23667eea"/></svg>',
            badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23667eea"/></svg>'
        });

        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE');
        audio.play().catch(() => {});
        
        setTimeout(() => notification.close(), 5000);
    }
}

function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    startBtn.textContent = 'Pauza';
    
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
    if (mode !== 'work') {
        document.body.classList.remove('work-mode');
    }

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

updateDisplay();
setMode('work');

const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

function addTask(text) {
    if (!text.trim()) return;

    const li = document.createElement('li');
    li.className = 'task-item flex items-center gap-3 p-3 rounded-xl bg-white bg-opacity-5 hover:bg-opacity-10 transition-all cursor-pointer';

    li.innerHTML = `
        <input type="checkbox" class="task-checkbox w-5 h-5 rounded border-2 border-white border-opacity-30 bg-transparent cursor-pointer accent-white">
        <span class="task-text flex-1 text-white text-opacity-90">${text}</span>
        <button class="task-delete text-white text-opacity-40 hover:text-opacity-80 transition-opacity text-lg">&times;</button>
    `;

    const checkbox = li.querySelector('.task-checkbox');
    const deleteBtn = li.querySelector('.task-delete');

    checkbox.addEventListener('change', () => {
        li.classList.toggle('task-completed', checkbox.checked);
    });

    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        li.style.opacity = '0';
        li.style.transform = 'translateX(20px)';
        setTimeout(() => li.remove(), 300);
    });

    taskList.appendChild(li);
    taskInput.value = '';
}

addTaskBtn.addEventListener('click', () => addTask(taskInput.value));

taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask(taskInput.value);
    }
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden && isRunning) {
    }
});

startBtn.addEventListener('click', () => {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}, { once: true });

// Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch(e.code) {
        case 'Space':
            e.preventDefault();
            if (isRunning) {
                pauseTimer();
            } else {
                startTimer();
            }
            break;
        case 'KeyR':
            resetTimer();
            break;
        case 'Digit1':
            setMode('work');
            break;
        case 'Digit2':
            setMode('short');
            break;
        case 'Digit3':
            setMode('long');
            break;
        }
});