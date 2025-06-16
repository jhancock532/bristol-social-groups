import React from 'react';
import { Group } from '@/types/Group';
import styles from './FilteredGroupsShownMessage.module.scss';

type FilteredGroupsShownMessageProps = {
    filteredGroups: {
        regularGroups: Group[];
        adHocGroups: Group[] | undefined;
    };
    numberOfPossibleGroups: number;
};

/**
 * Renders a message based on the number of groups filtered by the parent component.
 *
 * @param {Object} props.filteredGroups - The groups currently being shown
 * @param {number} props.numberOfPossibleGroups - The total number of groups available
 * @returns {JSX.Element | null} A paragraph element containing the message or null if no message is needed
 */
const FilteredGroupsShownMessage = ({
    filteredGroups,
    numberOfPossibleGroups,
}: FilteredGroupsShownMessageProps): React.JSX.Element | null => {
    const totalNumberOfGroupsFiltered =
        filteredGroups.regularGroups.length +
        (filteredGroups.adHocGroups ? filteredGroups.adHocGroups.length : 0);

    // If all groups are being shown, don't display a filter message
    if (totalNumberOfGroupsFiltered === numberOfPossibleGroups) {
        return null;
    }

    // If no weekday is selected (adHocGroups is undefined), and no
    // regularGroups are found, display a no results found message.
    if (
        (filteredGroups.adHocGroups === undefined ||
            filteredGroups.adHocGroups.length === 0) &&
        filteredGroups.regularGroups.length === 0
    ) {
        return (
            <p className={styles.message}>
                No groups found for these filter options.
            </p>
        );
    }

    // If no weekday is selected, display a message with the total number of groups found
    // without any distinction between regular and ad-hoc groups
    if (filteredGroups.adHocGroups === undefined) {
        return (
            <p className={styles.message}>
                Now showing <strong>{totalNumberOfGroupsFiltered}</strong> of{' '}
                <strong>{numberOfPossibleGroups}</strong> filtered groups.
            </p>
        );
    }

    // Otherwise distinguish between regular and ad-hoc groups
    // in the filter results message
    return (
        <p className={styles.message}>
            Now showing <strong>{filteredGroups.regularGroups.length}</strong>{' '}
            regularly meeting groups, and{' '}
            <strong>{filteredGroups.adHocGroups.length}</strong> groups
            organised on an ad-hoc basis. There are a total of{' '}
            <strong>{numberOfPossibleGroups}</strong> groups on this site.
        </p>
    );
};

export default FilteredGroupsShownMessage;
