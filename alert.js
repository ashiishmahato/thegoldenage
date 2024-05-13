
document.addEventListener("DOMContentLoaded", () => {
    const triggerButton = document.getElementById('trigger-alert-btn');
    triggerButton.addEventListener('click', () => simulateEmergencyAlert());
    loadHistory();
});

function simulateEmergencyAlert() {
    const alertData = {
        timestamp: new Date().toLocaleTimeString(),
        message: "Emergency at Home Address XYZ"
    };

    displayAlert(alertData);
    saveToHistory(alertData);
    playSound();
}

function displayAlert(alertData) {
    const alertList = document.getElementById('alert-list');
    const newAlert = document.createElement('li');
    newAlert.innerHTML = `Time: ${alertData.timestamp} - Message: ${alertData.message} <button class="close-alert" onclick="dismissAlert(this)">X</button>`;
    alertList.appendChild(newAlert);
}

function dismissAlert(button) {
    button.parentElement.remove();
}

function playSound() {
    const audio = new Audio('notification.mp3');
    audio.play();
}

function saveToHistory(alertData) {
    let alerts = JSON.parse(localStorage.getItem('alerts') || '[]');
    alerts.push(alertData);
    localStorage.setItem('alerts', JSON.stringify(alerts));
    updateHistory();
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('alerts') || '[]');
    history.forEach(alertData => {
        const historyList = document.getElementById('history-list');
        const item = document.createElement('li');
        item.textContent = `Time: ${alertData.timestamp} - Message: ${alertData.message}`;
        historyList.appendChild(item);
    });
}

function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    loadHistory();
}
