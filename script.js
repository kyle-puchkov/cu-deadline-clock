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
    const target = new Date(now);

    // Thursday is 4 in getDay(): (0=Sun ... 4=Thu ... 6=Sat)
    const targetDay = 4;
    const daysUntilThu = (targetDay - now.getDay() + 7) % 7;

    target.setDate(now.getDate() + daysUntilThu);
    target.setHours(23, 59, 0, 0); // 23:59

    // If it's already past Thursday 23:59 this week, jump to next week
    if (now > target) {
        target.setDate(target.getDate() + 7);
    }

    const totalMilliseconds = target - now;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);

    const weeks = Math.floor(totalSeconds / (60 * 60 * 24 * 7));
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor(totalMilliseconds % 1000);

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
