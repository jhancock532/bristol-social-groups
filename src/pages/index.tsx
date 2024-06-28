import React, { useState, useMemo } from 'react';
import fs from 'fs';
import { join } from 'path';
import GroupListingFeed from '@/components/GroupListingFeed';
import Layout from '@/components/Layout';
import Metadata from '@/components/Metadata';
import { ExpandIcon } from '@/components/Icons/ExpandIcon';
import { getDirectories } from '@/utils/utils';
import { WEEKDAYS, GROUP_DATA_FILE_PATH } from '@/constants';
import styles from './Index.module.scss';

const generateListOfGroupTags = (events: any) => {
    return events.reduce((tags: { [key: string]: number }, event: any) => {
        event.tags?.forEach((tag: string) => {
            tags[tag] = (tags[tag] || 0) + 1;
        });
        return tags;
    }, {});
};

export default function Home({ groups }: any) {
    const [selectedGroupTags, setSelectedGroupTags] = useState<string[]>([]);
    const [selectedWeekday, setSelectedWeekday] = useState<string>('None');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const groupTags = useMemo(() => generateListOfGroupTags(groups), [groups]);

    const handleGroupFilterClicked = (tag: string) => {
        setSelectedGroupTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
        );
    };

    const handleWeekdayFilterClicked = (weekday: string) => {
        setSelectedWeekday(weekday);
    };

    const clearAllFilters = () => {
        setSelectedGroupTags([]);
        setSelectedWeekday('None');
    };

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const filteredGroups = useMemo(() => {
        return groups.filter((event: any) => {
            const matchesTags =
                selectedGroupTags.length === 0 ||
                event.tags?.some((tag: string) =>
                    selectedGroupTags.includes(tag),
                );
            const matchesWeekday =
                selectedWeekday === 'None' ||
                event.events.some(
                    (e: any) => e.time.weekday === selectedWeekday,
                );
            return matchesTags && matchesWeekday;
        });
    }, [groups, selectedGroupTags, selectedWeekday]);

    return (
        <Layout>
            <Metadata
                title="Bristol Social Groups"
                description="A list of social groups in Bristol that meet up regularly and are open to newcomers."
            />
            <div className={styles.hero}>
                <h1 className={styles.title}>Bristol Social Groups</h1>
                <p className={styles.description}>
                    A collection of local groups that meet up regularly and are
                    open to newcomers.
                </p>
                <div className={styles.filterAccordion}>
                    <button
                        className={styles.filterAccordionToggle}
                        onClick={toggleFilter}
                    >
                        {isFilterOpen ? 'Hide' : 'Show'} filter options
                        <ExpandIcon
                            className={styles.filterIcon}
                            pointDownwards={!isFilterOpen}
                        />
                    </button>
                    {isFilterOpen && (
                        <div className={styles.filterContent}>
                            <div className={styles.groupFilterOptionsContainer}>
                                <div className={styles.groupTagFilterContainer}>
                                    <p className={styles.groupFilterTitle}>
                                        Filter by tags
                                    </p>
                                    <div className={styles.groupTagsContainer}>
                                        {Object.entries(groupTags).map(
                                            ([tag, count]) => (
                                                <div
                                                    key={tag}
                                                    className={
                                                        styles.groupTagFilter
                                                    }
                                                >
                                                    <input
                                                        type="checkbox"
                                                        id={`group-tag-checkbox-${tag}`}
                                                        checked={selectedGroupTags.includes(
                                                            tag,
                                                        )}
                                                        onChange={() =>
                                                            handleGroupFilterClicked(
                                                                tag,
                                                            )
                                                        }
                                                        className={
                                                            styles.groupTagFilter__checkbox
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={`group-tag-checkbox-${tag}`}
                                                        className={
                                                            styles.groupTagFilter__label
                                                        }
                                                    >
                                                        {`${tag} (${count})`}
                                                    </label>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                                <div className={styles.groupTagFilterContainer}>
                                    <p className={styles.groupFilterTitle}>
                                        Filter by day
                                    </p>
                                    <div className={styles.groupTagsContainer}>
                                        {WEEKDAYS.map((day) => (
                                            <div
                                                key={day}
                                                className={
                                                    styles.groupTagFilter
                                                }
                                            >
                                                <input
                                                    type="radio"
                                                    id={`weekday-radio-${day}`}
                                                    checked={
                                                        selectedWeekday === day
                                                    }
                                                    onChange={() =>
                                                        handleWeekdayFilterClicked(
                                                            day,
                                                        )
                                                    }
                                                    className={
                                                        styles.groupTagFilter__checkbox
                                                    }
                                                />
                                                <label
                                                    htmlFor={`weekday-radio-${day}`}
                                                    className={
                                                        styles.groupTagFilter__label
                                                    }
                                                >
                                                    {day}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {(selectedGroupTags.length !== 0 ||
                                    selectedWeekday !== 'None') && (
                                    <button
                                        className={
                                            styles.clearSelectedTagsButton
                                        }
                                        onClick={clearAllFilters}
                                    >
                                        Clear all filters
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <GroupListingFeed
                groups={filteredGroups}
                selectedWeekday={selectedWeekday}
            />
        </Layout>
    );
}

export const getStaticProps = async () => {
    const paths = getDirectories(GROUP_DATA_FILE_PATH);

    const groups = paths.map((path: string) => {
        const fullGroupPath = join(GROUP_DATA_FILE_PATH, path, 'details.json');
        return JSON.parse(fs.readFileSync(fullGroupPath, { encoding: 'utf8' }));
    });

    return {
        props: {
            groups,
        },
    };
};
