import React from 'react';
import styles from './FilteredGroupsShownMessage.module.scss';

type FilteredGroupsShownMessageProps = {
    numberOfGroupsFiltered: number;
    numberOfPossibleGroups: number;
};

/**
 * Renders a message based on the number of groups filtered by the parent component.
 *
 * @param {number} props.numberOfGroupsFiltered - The number of groups currently being shown
 * @param {number} props.numberOfPossibleGroups - The total number of groups available
 * @returns {JSX.Element | null} A paragraph element containing the message or null if no message is needed
 */
const FilteredGroupsShownMessage = ({
    numberOfGroupsFiltered,
    numberOfPossibleGroups,
}: FilteredGroupsShownMessageProps): JSX.Element | null => {
    if (numberOfGroupsFiltered === numberOfPossibleGroups) {
        return null;
    }

    if (numberOfGroupsFiltered === 0) {
        return (
            <p className={styles.message}>
                No groups found for these filter options.
            </p>
        );
    }

    return (
        <p className={styles.message}>
            Now showing <strong>{numberOfGroupsFiltered}</strong> of{' '}
            <strong>{numberOfPossibleGroups}</strong> filtered groups.
        </p>
    );
};

export default FilteredGroupsShownMessage;
