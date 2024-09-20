import React, { useState, useMemo } from 'react';
import fs from 'fs';
import { join } from 'path';
import GroupListingFeed from '@/components/GroupListingFeed';
import GroupListingMap from '@/components/GroupListingMap';
import Layout from '@/components/Layout';
import Link from '@/components/Link';
import Metadata from '@/components/Metadata';
import FilteredGroupsShownMessage from '@/components/FilteredGroupsShownMessage';
import { ExpandIcon } from '@/components/Icons/ExpandIcon';
import { filterGroups, getDirectories } from '@/utils/utils';
import { WEEKDAYS, GROUP_DATA_FILE_PATH } from '@/constants';
import { Event } from '@/types/Event';
import { Group } from '@/types/Group';
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
    const [selectedWeekday, setSelectedWeekday] = useState<string>('All');
    const [filterIsOpen, setFilterIsOpen] = useState(false);

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
        setSelectedWeekday('All');
    };

    const toggleFilter = () => {
        setFilterIsOpen(!filterIsOpen);
    };

    const filteredGroups = useMemo(() => {
        return filterGroups(groups, selectedGroupTags, selectedWeekday);
    }, [groups, selectedGroupTags, selectedWeekday]);

    const filteredGroupsContainRegularLocation =
        filteredGroups.regularGroups.some((group: Group) => {
            if (!group.events) {
                return false;
            }
            return group.events.some((event: Event) => event.location);
        });

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
                        {filterIsOpen ? 'Hide' : 'Show'} filter options
                        <ExpandIcon
                            className={styles.filterIcon}
                            pointDownwards={!filterIsOpen}
                        />
                    </button>
                    {filterIsOpen && (
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

                                <FilteredGroupsShownMessage
                                    filteredGroups={filteredGroups}
                                    numberOfPossibleGroups={groups.length}
                                />

                                {(selectedGroupTags.length !== 0 ||
                                    selectedWeekday !== 'All') && (
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

            {filteredGroupsContainRegularLocation && (
                <GroupListingMap
                    groups={filteredGroups.regularGroups}
                    selectedWeekday={selectedWeekday}
                />
            )}

            <GroupListingFeed
                groups={filteredGroups.regularGroups}
                selectedWeekday={selectedWeekday}
            />

            {filteredGroups.adHocGroups &&
                filteredGroups.adHocGroups.length !== 0 && (
                    <div>
                        <div className={styles.adHocGroupsIntroduction}>
                            <h2>Ad-hoc groups</h2>
                            <p className={styles.description}>
                                These groups may host an event on the day
                                you&apos;ve specified. Please check the groups
                                website, social media page or group chat for
                                more information.{' '}
                            </p>
                        </div>
                        <GroupListingFeed
                            groups={filteredGroups.adHocGroups}
                            selectedWeekday={selectedWeekday}
                        />
                    </div>
                )}

            <div className={styles.callToAction}>
                <h2>Not found what you&apos;re looking for?</h2>{' '}
                <p>
                    Check the{' '}
                    <Link url="/more-resources">more resources page</Link> for
                    further sites that list groups in Bristol.
                </p>
            </div>
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
