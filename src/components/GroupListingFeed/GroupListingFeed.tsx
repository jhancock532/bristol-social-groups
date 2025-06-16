import React from 'react';
import GroupCard from '@/components/GroupCard';
import { Event } from '@/types/Event';
import { Group } from '@/types/Group';

type GroupListingFeedProps = {
    groups: Group[];
    selectedWeekday?: string;
};

/**
 * Renders a feed of group listings with optional weekday filtering.
 *
 * @param {Group[]} props.groups - An array of group objects to display
 * @param {string | undefined} props.selectedWeekday - The selected weekday for filtering events, or null for no filter
 * @returns {JSX.Element} A div containing GroupCard components for each group
 */
const GroupListingFeed = ({
    groups,
    selectedWeekday,
}: GroupListingFeedProps): React.JSX.Element => {
    return (
        <div>
            {groups.map((group: Group, index: number) => {
                // Filter group events by selected weekday
                let filteredEvents = group.events;
                if (group.events) {
                    if (selectedWeekday && selectedWeekday !== 'All') {
                        filteredEvents = group.events.filter((e: Event) => {
                            if (e.time === undefined) return false;
                            return e.time.weekday === selectedWeekday;
                        });
                    }
                }

                return (
                    <GroupCard
                        key={index}
                        name={group.name}
                        links={group.links}
                        description={group.description}
                        slug={group.slug}
                        subscriptions={group.subscriptions}
                        events={filteredEvents}
                    />
                );
            })}
        </div>
    );
};

export default GroupListingFeed;
