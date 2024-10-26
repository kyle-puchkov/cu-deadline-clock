function followGrammar(type, num) {
    if (5 <= num && num <= 20) {
        return type;
    }
    if (num % 10 == 0) {
        return type;
    }
    if (num % 10 == 1) {
        switch(type) {
            case "НЕДЕЛЬ": return "НЕДЕЛЯ";
            case "ДНЕЙ": return "ДЕНЬ";
            case "ЧАСОВ": return "ЧАС";
            case "МИНУТ": return "МИНУТА";
            case "СЕКУНД": return "СЕКУНДА";
            default: return type;
        }
    }
    if (num % 10 < 5) {
        switch(type) {
            case "НЕДЕЛЬ": return "НЕДЕЛИ";
            case "ДНЕЙ": return "ДНЯ";
            case "ЧАСОВ": return "ЧАСА";
            case "МИНУТ": return "МИНУТЫ";
            case "СЕКУНД": return "СЕКУНДЫ";
            default: return type;
        }
    }
    return type;
}

function updateCountdown() {
    const now = new Date();
    const nextSunday = new Date();

    const daysUntilSunday = (7 - now.getDay()) % 7; // 0 means today, so we want next Sunday
    nextSunday.setDate(now.getDate() + daysUntilSunday);
    nextSunday.setHours(13, 30, 0, 0); // Set to 22:00

    // If it's already past Sunday 22:00, set the next Sunday
    if (now > nextSunday) {
        nextSunday.setDate(nextSunday.getDate() + 7);
    }

    const totalMilliseconds = nextSunday - now;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);

    const weeks = Math.floor(totalSeconds / (60 * 60 * 24 * 7));
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((totalMilliseconds % 1000) ); // Divide by 10 to get 2 digits

    document.getElementById('weeks').textContent = `${weeks} ${followGrammar('НЕДЕЛЬ', weeks)}`;
    document.getElementById('days').textContent = `${days} ${followGrammar('ДНЕЙ', days)}`;
    document.getElementById('hours').textContent = `${hours.toString().padStart(2, '0')} ${followGrammar('ЧАСОВ', hours)}`;
    document.getElementById('minutes').textContent = `${minutes.toString().padStart(2, '0')} ${followGrammar('МИНУТ', minutes)}`;
    document.getElementById('seconds').textContent = `${seconds.toString().padStart(2, '0')} ${followGrammar('СЕКУНД', seconds)}`;
    document.getElementById('milliseconds').textContent = `${milliseconds.toString().padStart(3, '0')} МИЛЛИСЕКУНД`;
}

// Update countdown every 11 milliseconds for smoother display
setInterval(updateCountdown, 11);
updateCountdown(); // Initial call
