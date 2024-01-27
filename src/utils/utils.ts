import fs from 'fs';

export const get24HourTimeFromDateString = (date: string): string => {
    const dateObject = new Date(date);

    return `${dateObject.getHours()}:${dateObject
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
};

export const getAMPMTimeFromDateString = (date: string): string => {
    const dateObject = new Date(date);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    return `${hours % 12 === 0 ? 12 : hours % 12}:${minutes
        .toString()
        .padStart(2, '0')} ${ampm}`;
};

export const getDirectories = (source: string) =>
    fs
        .readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
