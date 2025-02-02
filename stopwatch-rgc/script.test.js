// Mock DOM elements
document.body.innerHTML = `
    <div id="mode-selection">
        <button id="stopwatchBtn">⏱️ Stopwatch</button>
        <button id="countdownBtn">⏲️ Countdown</button>
    </div>
    <div id="timer-container" class="hidden">
        <div id="timer">00:00:00</div>
        <div class="milliseconds">000</div>
        <div id="numpad" class="hidden">
            <div class="numpad-grid">
                <button class="num-btn">1</button>
                <button class="num-btn">2</button>
                <button class="num-btn">3</button>
                <button class="num-btn">4</button>
                <button class="num-btn">5</button>
                <button class="set-btn">✅ Set</button>
                <button class="num-btn">6</button>
                <button class="num-btn">7</button>
                <button class="num-btn">8</button>
                <button class="num-btn">9</button>
                <button class="num-btn">0</button>
                <button class="clear-num-btn">❌ Clear</button>
            </div>
        </div>
        <button id="startBtn">▶️ Start</button>
        <button id="clearBtn">🔄 Clear</button>
        <button id="backBtn">⬅️ Back</button>
    </div>
`;

describe('Stopwatch/Countdown Timer', () => {
    let timer;

    beforeEach(() => {
        jest.resetModules();
        jest.useFakeTimers();
        timer = require('./script');
        // Reset DOM classes and state
        document.getElementById('timer-container').classList.add('hidden');
        document.getElementById('numpad').classList.add('hidden');
        document.getElementById('mode-selection').classList.remove('hidden');
        document.getElementById('startBtn').textContent = '▶️ Start';
        document.getElementById('timer').textContent = '00:00:00';
        document.querySelector('.milliseconds').textContent = '000';
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    test('should initialize with correct default values', () => {
        expect(timer.state.isStopwatchMode).toBe(true);
        expect(timer.state.isRunning).toBe(false);
        expect(timer.state.elapsedTime).toBe(0);
        expect(document.getElementById('timer').textContent).toBe('00:00:00');
        expect(document.querySelector('.milliseconds').textContent).toBe('000');
    });

    test('should switch to stopwatch mode correctly', () => {
        timer.showTimer('stopwatch');
        expect(timer.state.isStopwatchMode).toBe(true);
        expect(document.getElementById('numpad').classList.contains('hidden')).toBe(true);
        expect(document.getElementById('timer-container').classList.contains('hidden')).toBe(false);
    });

    test('should switch to countdown mode correctly', () => {
        timer.showTimer('countdown');
        expect(timer.state.isStopwatchMode).toBe(false);
        expect(document.getElementById('numpad').classList.contains('hidden')).toBe(false);
        expect(document.getElementById('timer-container').classList.contains('hidden')).toBe(false);
    });

    test('should start and stop stopwatch', () => {
        timer.showTimer('stopwatch');
        timer.startTimer();
        expect(timer.state.isRunning).toBe(true);
        
        jest.advanceTimersByTime(1000);
        expect(document.getElementById('timer').textContent).toBe('00:00:01');
        
        timer.startTimer(); // Stop
        expect(timer.state.isRunning).toBe(false);
        expect(document.getElementById('startBtn').textContent).toBe('▶️ Start');
    });

    test('should handle countdown correctly', () => {
        timer.showTimer('countdown');
        timer.handleNumpadInput('1');
        timer.handleNumpadInput('Set');
        expect(timer.state.countdownDuration).toBe(1000);
        
        timer.startTimer();
        jest.advanceTimersByTime(500);
        expect(timer.state.elapsedTime).toBeLessThan(1000);
        expect(timer.state.elapsedTime).toBeGreaterThan(0);
    });

    test('should clear timer correctly', () => {
        timer.showTimer('stopwatch');
        timer.startTimer();
        jest.advanceTimersByTime(1000);
        timer.clearTimer();
        
        expect(timer.state.isRunning).toBe(false);
        expect(timer.state.elapsedTime).toBe(0);
        expect(document.getElementById('timer').textContent).toBe('00:00:00');
        expect(document.querySelector('.milliseconds').textContent).toBe('000');
    });

    describe('Numpad Input', () => {
        beforeEach(() => {
            timer.showTimer('countdown');
        });

        test('should handle numeric input sequence correctly', () => {
            ['1', '2', '3', '4', '5', '6'].forEach(num => {
                timer.handleNumpadInput(num);
            });
            expect(timer.state.inputTime).toBe('123456');
            expect(document.getElementById('timer').textContent).toBe('12:34:56');
        });

        test('should handle Set button after numeric input', () => {
            ['0', '0', '0', '1', '0', '0'].forEach(num => {
                timer.handleNumpadInput(num);
            });
            timer.handleNumpadInput('Set');
            expect(document.getElementById('numpad').classList.contains('hidden')).toBe(true);
            expect(timer.state.countdownDuration).toBe(60000); // 1 minute in ms
        });

        test('should handle Clear button', () => {
            ['1', '2', '3'].forEach(num => {
                timer.handleNumpadInput(num);
            });
            timer.handleNumpadInput('Clear');
            expect(timer.state.inputTime).toBe('000000');
            expect(document.getElementById('timer').textContent).toBe('00:00:00');
        });
    });

    describe('Timer Controls', () => {
        test('should handle rapid start/stop actions', () => {
            timer.showTimer('stopwatch');
            timer.startTimer();
            jest.advanceTimersByTime(100);
            timer.startTimer(); // Stop
            timer.startTimer(); // Start again
            jest.advanceTimersByTime(100);
            expect(timer.state.elapsedTime).toBeGreaterThan(100);
        });

        test('should maintain elapsed time when paused', () => {
            timer.showTimer('stopwatch');
            timer.startTimer();
            jest.advanceTimersByTime(5000);
            timer.startTimer(); // Pause
            const pausedTime = timer.state.elapsedTime;
            jest.advanceTimersByTime(2000);
            expect(timer.state.elapsedTime).toBe(pausedTime);
        });

        test('should handle countdown with millisecond precision', () => {
            timer.showTimer('countdown');
            timer.handleNumpadInput('0');
            timer.handleNumpadInput('0');
            timer.handleNumpadInput('0');
            timer.handleNumpadInput('0');
            timer.handleNumpadInput('1');
            timer.handleNumpadInput('0');
            timer.handleNumpadInput('Set');
            timer.startTimer();
            jest.advanceTimersByTime(500);
            expect(document.querySelector('.milliseconds').textContent).toBe('500');
        });
    });

    describe('Edge Cases', () => {
        test('should handle maximum time values', () => {
            timer.showTimer('countdown');
            ['9', '9', '5', '9', '5', '9'].forEach(num => {
                timer.handleNumpadInput(num);
            });
            timer.handleNumpadInput('Set');
            expect(document.getElementById('timer').textContent).toBe('99:59:59');
        });

        test('should handle rapid mode switching', () => {
            timer.showTimer('stopwatch');
            timer.startTimer();
            jest.advanceTimersByTime(1000);
            timer.showTimer('countdown');
            timer.showTimer('stopwatch');
            expect(timer.state.elapsedTime).toBe(0);
            expect(timer.state.isRunning).toBe(false);
        });

        test('should handle countdown completion exactly', () => {
            timer.showTimer('countdown');
            timer.handleNumpadInput('1');
            timer.handleNumpadInput('Set');
            timer.startTimer();
            jest.advanceTimersByTime(1000);
            expect(timer.state.elapsedTime).toBe(0);
            expect(timer.state.isRunning).toBe(false);
            expect(document.getElementById('timer').textContent).toBe('00:00:00');
            expect(document.querySelector('.milliseconds').textContent).toBe('000');
        });
    });

    describe('UI Interaction', () => {
        test('should update button states correctly', () => {
            timer.showTimer('stopwatch');
            expect(document.getElementById('startBtn').textContent).toBe('▶️ Start');
            timer.startTimer();
            expect(document.getElementById('startBtn').textContent).toBe('⏸️ Stop');
            timer.startTimer();
            expect(document.getElementById('startBtn').textContent).toBe('▶️ Start');
        });

        test('should maintain UI consistency during mode switches', () => {
            timer.showTimer('countdown');
            timer.handleNumpadInput('1');
            timer.handleNumpadInput('Set');
            timer.startTimer();
            timer.showTimer('stopwatch');
            expect(document.getElementById('numpad').classList.contains('hidden')).toBe(true);
            expect(document.getElementById('startBtn').textContent).toBe('▶️ Start');
        });
    });
});