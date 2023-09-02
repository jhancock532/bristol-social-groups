export const get24HourTimeFromDateString = (date: string): string => {
    const dateObject = new Date(date);

    return `${dateObject.getHours()}:${dateObject
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
};
