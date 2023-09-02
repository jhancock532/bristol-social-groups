import fs from 'fs';

export const get24HourTimeFromDateString = (date: string): string => {
    const dateObject = new Date(date);

    return `${dateObject.getHours()}:${dateObject
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
};

export const getDirectories = (source: string) =>
    fs
        .readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
