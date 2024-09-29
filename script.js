function updateCountdown() {
    const now = new Date();
    const nextSunday = new Date();

    const daysUntilSunday = (7 - now.getDay()) % 7; // 0 means today, so we want next Sunday
    nextSunday.setDate(now.getDate() + daysUntilSunday);
    nextSunday.setHours(22, 0, 0, 0); // Set to 22:00

    // If it's already past Sunday 22:00, set the next Sunday
    if (now > nextSunday) {
        nextSunday.setDate(nextSunday.getDate() + 7);
    }

    const totalMilliseconds = nextSunday - now;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);

    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((totalMilliseconds % 1000) ); // Divide by 10 to get 2 digits

    document.getElementById('days').textContent = `${days} ДНЕЙ`;
    document.getElementById('hours').textContent = `${hours.toString().padStart(2, '0')} ЧАСОВ`;
    document.getElementById('minutes').textContent = `${minutes.toString().padStart(2, '0')} МИНУТ`;
    document.getElementById('seconds').textContent = `${seconds.toString().padStart(2, '0')} СЕКУНД`;
    document.getElementById('seconds').textContent = `${seconds.toString().padStart(2, '0')} СЕКУНД`;
    document.getElementById('milliseconds').textContent = `${milliseconds.toString().padStart(3, '0')} МИЛЛИСЕКУНД`;
}

// Update countdown every 10 milliseconds for smoother display
setInterval(updateCountdown, 10);
updateCountdown(); // Initial call
