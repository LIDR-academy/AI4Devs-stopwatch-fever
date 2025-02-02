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
                <button class="set-btn">✅ Set</button>
                <button class="clear-num-btn">❌ Clear</button>
            </div>
        </div>
        <button id="startBtn">▶️ Start</button>
        <button id="clearBtn">🔄 Clear</button>
        <button id="backBtn">⬅️ Back</button>
    </div>
`;