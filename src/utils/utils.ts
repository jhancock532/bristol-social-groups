import fs from 'fs';
import { Group } from '@/types/Group';

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

/**
 * Filters the provided groups by the selected tags and weekday.
 * Returns all groups that match any of the selected tags and have at
 * least one event on the selected weekday.
 * If no tags are selected, events are only filtered by weekday, and vice versa.
 * Groups that have ad-hoc event organization are returned separately
 * to the main filtered groups when filtering by weekday.
 *
 * @param groups
 * @param selectedGroupTags
 * @param selectedWeekday
 *
 * @returns { regularGroups: Array, adHocGroups: Array } - an object
 * with a list of groups that have a guaranteed event on the selected
 * weekday, and a list of groups that have ad-hoc event organisation.
 */
export const filterGroups = (
    groups: Group[],
    selectedGroupTags: string[],
    selectedWeekday: string,
) => {
    const regularGroups = groups.filter((event: any) => {
        // Find the groups that have a matching tag
        let matchingTagFound = event.tags?.some((tag: string) =>
            selectedGroupTags.includes(tag),
        );

        // If no tags are filtered by, all groups will be shown
        if (selectedGroupTags.length === 0) matchingTagFound = true;

        // Find the groups that have a matching weekday
        let matchingWeekdaySelected = false;

        // If no weekday is selected, all groups will be shown
        if (selectedWeekday === 'All') {
            matchingWeekdaySelected = true;
        } else if (event.events) {
            // If the group has event information,
            // check if it has an event on the selected weekday
            matchingWeekdaySelected = event.events.some(
                (e: any) => e.time.weekday === selectedWeekday,
            );
        }

        const adHocGroup = event.type === 'Discord' || event.type === 'Ad-hoc';

        if (adHocGroup) {
            return false;
        }

        return matchingTagFound && matchingWeekdaySelected;
    });

    const adHocGroups = groups.filter((event: any) => {
        // Find the groups that have a matching tag
        let matchingTagFound = event.tags?.some((tag: string) =>
            selectedGroupTags.includes(tag),
        );

        // If no tags are filtered by, all ad-hoc groups will be shown
        if (selectedGroupTags.length === 0) matchingTagFound = true;

        const adHocGroup = event.type === 'Discord' || event.type === 'Ad-hoc';

        return matchingTagFound && adHocGroup;
    });

    // If no weekday is selected, then we don't need to separate the ad-hoc groups from the regular groups.
    // Combine these both into one filteredGroups array.
    if (selectedWeekday === 'All') {
        return {
            regularGroups: regularGroups.concat(adHocGroups),
            adHocGroups: undefined,
        };
    }

    return { regularGroups, adHocGroups };
};
