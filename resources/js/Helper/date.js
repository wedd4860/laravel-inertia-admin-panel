const getWeekNumbersInMonth = (year, month) => {
    let weeks = [];
    let firstDay = new Date(year, month, 1);
    let lastDay = new Date(year, month + 1, 0);

    let currentDay = new Date(firstDay);

    while (currentDay <= lastDay) {
        if (currentDay.getDay() === 0) {
            let startOfWeek = new Date(currentDay);
            let endOfWeek = new Date(currentDay);
            endOfWeek.setDate(endOfWeek.getDate() + 6);

            let weekNumber = getWeekNumber(startOfWeek);

            weeks.push({
                start: startOfWeek,
                end: endOfWeek,
                weekNumber: weekNumber,
            });
        }
        currentDay.setDate(currentDay.getDate() + 1);
    }

    return weeks;
};

export const getWeekNumber = (date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const millisecondsInDay = 86400000;
    return Math.ceil(
        ((date - oneJan) / millisecondsInDay + oneJan.getDay() + 1) / 7
    );
};

export const getWeeksInMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const weeksInMonth = getWeekNumbersInMonth(year, month);

    return weeksInMonth.map((v) => v.weekNumber);
};

export const getTimeToHMSFormat = (elapsedTime) => {
    const elapsedTimeSeconds = Math.floor(elapsedTime);
    const hours = Math.floor(elapsedTimeSeconds / 3600);
    const minutes = Math.floor((elapsedTimeSeconds % 3600) / 60);
    const seconds = elapsedTimeSeconds % 60;

    if (hours > 0) return `${hours}시 ${minutes}분`;
    return `${minutes}분 ${seconds}초`;
};

export const formatDateLocal = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
};

export const calculateElapsedTime = (start, end) => {
    const startMilliseconds = new Date(start).getTime();
    const endMilliseconds = new Date(end).getTime();
    const elapsedMilliseconds = Math.abs(endMilliseconds - startMilliseconds);
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

    return elapsedSeconds;
};

export const getWeekDays = (date) => {
    const inputDate = new Date(date);

    const dayOfWeek = inputDate.getDay();

    const diffToSaturday = dayOfWeek === 6 ? 0 : -(dayOfWeek + 1);

    const startOfWeek = new Date(inputDate);
    startOfWeek.setDate(inputDate.getDate() + diffToSaturday);

    const weekDays = [];

    for (let i = 0; i < 7; i++) {
        const tempDay = new Date(startOfWeek);
        tempDay.setDate(startOfWeek.getDate() + i);

        weekDays.push(formatDateLocal(tempDay));
    }

    return weekDays;
};

export const isTimestampInCurrentOneClockHour = (timestamp) => {
    const now = new Date();
    const startOfCurrentHour = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours()
    ).getTime();
    const startOfNextHour = startOfCurrentHour + 60 * 60 * 1000;

    return timestamp < startOfNextHour && timestamp >= startOfCurrentHour;
};

export const isToday = (timestamp) => {
    return (
        new Date(timestamp).toLocaleDateString() ===
        new Date().toLocaleDateString()
    );
};
