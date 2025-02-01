// Estado de la aplicación
const state = {
    currentScreen: 'main',
    stopwatch: {
        running: false,
        startTime: 0,
        elapsedTime: 0,
        intervalId: null
    },
    countdown: {
        running: false,
        remainingTime: 0,
        intervalId: null,
        digits: [] // Array para almacenar los dígitos introducidos
    }
};

// Elementos DOM
const mainScreen = document.getElementById('mainScreen');
const stopwatchScreen = document.getElementById('stopwatchScreen');
const countdownScreen = document.getElementById('countdownScreen');
const stopwatchDisplay = document.querySelector('.stopwatch-screen .display');
const countdownDisplay = document.querySelector('.countdown-screen .display');
const startButton = document.querySelector('.start-btn');

// Función para formatear tiempo en formato HH:MM:SS.mmm
function formatTime(ms) {
    const pad = (num) => String(num).padStart(2, '0');
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${String(milliseconds).padStart(3, '0')}`;
}

// Inicialización de pantallas
function initScreens() {
    // Asegurarse de que la pantalla principal está activa al inicio
    mainScreen.classList.add('active');
    stopwatchScreen.classList.remove('active');
    countdownScreen.classList.remove('active');
}

// Navegación entre pantallas
function navigateToScreen(targetScreen, direction) {
    const screens = {
        main: mainScreen,
        stopwatch: stopwatchScreen,
        countdown: countdownScreen
    };
    
    const currentScreenElement = screens[state.currentScreen];
    const targetScreenElement = screens[targetScreen];
    
    // Remover clase active de la pantalla actual
    currentScreenElement.classList.remove('active');
    
    // Configurar posición inicial de la nueva pantalla
    targetScreenElement.style.transform = direction === 'right' ? 
        'translateX(100%)' : 'translateX(-100%)';
    targetScreenElement.style.visibility = 'visible';
    
    // Forzar reflow
    void targetScreenElement.offsetHeight;
    
    // Animar transición
    requestAnimationFrame(() => {
        currentScreenElement.style.transform = direction === 'right' ? 
            'translateX(-100%)' : 'translateX(100%)';
        targetScreenElement.style.transform = 'translateX(0)';
        targetScreenElement.classList.add('active');
    });
    
    // Actualizar estado y gestionar botón Back
    state.currentScreen = targetScreen;
    updateBackButton(targetScreen);
}


// Nueva función para gestionar la visibilidad y comportamiento del botón Back
function updateBackButton(screen) {
    const footer = document.querySelector('.footer');
    const backBtn = document.querySelector('.back-btn');
    
    if (screen === 'main') {
        footer.classList.remove('clickable');
        backBtn.style.display = 'none';
    } else {
        footer.classList.add('clickable');
        backBtn.style.display = 'flex';
    }
}

// Funcionalidad del cronómetro
function startStopwatch() {
    if (!state.stopwatch.running) {
        state.stopwatch.startTime = Date.now() - state.stopwatch.elapsedTime;
        state.stopwatch.running = true;
        state.stopwatch.intervalId = setInterval(updateStopwatch, 10);
        startButton.textContent = 'Pausar';
        stopwatchScreen.classList.add('running');
    } else {
        clearInterval(state.stopwatch.intervalId);
        state.stopwatch.running = false;
        startButton.textContent = 'Iniciar';
        stopwatchScreen.classList.remove('running');
    }
}

function updateStopwatch() {
    state.stopwatch.elapsedTime = Date.now() - state.stopwatch.startTime;
    stopwatchDisplay.textContent = formatTime(state.stopwatch.elapsedTime);
}

function clearStopwatch() {
    if (state.stopwatch.running) {
        clearInterval(state.stopwatch.intervalId);
        state.stopwatch.running = false;
    }
    state.stopwatch.elapsedTime = 0;
    state.stopwatch.startTime = 0;
    stopwatchDisplay.textContent = formatTime(0);
    startButton.textContent = 'Iniciar';
    stopwatchScreen.classList.remove('running');
}

// Nueva función para formatear el tiempo del countdown basado en dígitos
function formatCountdownDisplay(digits) {
    // Rellenar con ceros a la izquierda hasta tener 6 dígitos
    const allDigits = Array(6).fill('0');
    
    // Colocar los dígitos introducidos desde la derecha
    const len = Math.min(digits.length, 6);
    for (let i = 0; i < len; i++) {
        allDigits[6 - len + i] = digits[i];
    }
    
    // Formatear como HH:MM:SS.000
    return `${allDigits[0]}${allDigits[1]}:${allDigits[2]}${allDigits[3]}:${allDigits[4]}${allDigits[5]}.000`;
}

// Función para manejar la entrada de dígitos
function handleNumberInput(num) {
    if (!state.countdown.running && state.countdown.digits.length < 6) {
        state.countdown.digits.push(num);
        updateCountdownDisplay();
    }
}

// Actualizar el display del countdown
function updateCountdownDisplay() {
    countdownDisplay.textContent = formatCountdownDisplay(state.countdown.digits);
}

// Convertir los dígitos a milisegundos
function digitsToMilliseconds(digits) {
    // Rellenar con ceros a la izquierda
    const allDigits = Array(6).fill('0');
    const len = Math.min(digits.length, 6);
    for (let i = 0; i < len; i++) {
        allDigits[6 - len + i] = digits[i];
    }
    
    const hours = parseInt(allDigits[0] + allDigits[1], 10);
    const minutes = parseInt(allDigits[2] + allDigits[3], 10);
    const seconds = parseInt(allDigits[4] + allDigits[5], 10);
    
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
}

// Inicializar el countdown
function setCountdown() {
    if (state.countdown.digits.length > 0 && !state.countdown.running) {
        state.countdown.remainingTime = digitsToMilliseconds(state.countdown.digits);
        startCountdown();
    }
}

function startCountdown() {
    if (state.countdown.remainingTime > 0) {
        state.countdown.running = true;
        state.countdown.intervalId = setInterval(() => {
            state.countdown.remainingTime = Math.max(0, state.countdown.remainingTime - 10);
            countdownDisplay.textContent = formatTime(state.countdown.remainingTime);
            
            if (state.countdown.remainingTime === 0) {
                clearInterval(state.countdown.intervalId);
                state.countdown.running = false;
                playAlarm();
            }
        }, 10);
    }
}

function clearCountdown() {
    if (state.countdown.running) {
        clearInterval(state.countdown.intervalId);
        state.countdown.running = false;
    }
    state.countdown.remainingTime = 0;
    state.countdown.digits = [];
    updateCountdownDisplay();
}

function playAlarm() {
    console.log('¡Tiempo finalizado!');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar pantallas
    initScreens();

    // Navegación desde la pantalla principal
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', (e) => {
            const target = e.currentTarget.dataset.target;
            navigateToScreen(target, target === 'stopwatch' ? 'left' : 'right');
        });
    });

    // Click en el footer para volver
    const footer = document.querySelector('.footer');
    footer.addEventListener('click', () => {
        if (footer.classList.contains('clickable')) {
            const direction = state.currentScreen === 'stopwatch' ? 'right' : 'left';
            
            // Limpiar temporizadores activos al volver
            if (state.currentScreen === 'stopwatch') {
                clearStopwatch();
            } else if (state.currentScreen === 'countdown') {
                clearCountdown();
            }
            
            navigateToScreen('main', direction);
        }
    });

    // Controles del cronómetro
    startButton.addEventListener('click', startStopwatch);
    document.querySelector('.stopwatch-screen .clear-btn').addEventListener('click', clearStopwatch);

    // Controles del temporizador
    document.querySelectorAll('.num-btn').forEach(btn => {
        btn.addEventListener('click', () => handleNumberInput(btn.textContent));
    });
    document.querySelector('.set-btn').addEventListener('click', setCountdown);
    document.querySelector('.countdown-screen .clear-btn').addEventListener('click', clearCountdown);
});
