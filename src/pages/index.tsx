import React from 'react';
import fs from 'fs';
import { join } from 'path';
import Link from 'next/link';
import EventCard from '@/components/EventCard';
import Layout from '@/components/Layout';
import Metadata from '@/components/Metadata';
import { getDirectories } from '@/utils/utils';
import styles from './Index.module.scss';

const generateListOfEventTags = (events: any) => {
    interface TagsObject {
        [key: string]: number;
    }

    let tags: TagsObject = {};

    for (let i = 0; i < events.length; i += 1) {
        if (events[i].tags) {
            for (let j = 0; j < events[i].tags.length; j += 1) {
                if (!Object.keys(tags).includes(events[i].tags[j])) {
                    tags[events[i].tags[j]] = 1;
                } else {
                    tags[events[i].tags[j]] += 1;
                }
            }
        }
    }

    return tags;
};

export default function Home({ events }: any) {
    const [selectedEventTags, setSelectedEventTags] = React.useState<string[]>(
        [],
    );

    const eventTags = generateListOfEventTags(events);

    const handleEventFilterClicked = (tag: string) => {
        if (selectedEventTags.includes(tag)) {
            const indexOfTag = selectedEventTags.indexOf(tag);
            selectedEventTags.splice(indexOfTag, 1);
            setSelectedEventTags([...selectedEventTags]);
        } else {
            setSelectedEventTags([tag, ...selectedEventTags]);
        }
    };

    const filteredEvents =
        selectedEventTags.length > 0
            ? events.filter((event: any) => {
                  for (let i = 0; i < event.tags.length; i += 1) {
                      if (selectedEventTags.includes(event.tags[i])) {
                          return true;
                      }
                  }
                  return false;
              })
            : events;

    return (
        <Layout>
            <Metadata
                title="Social Bristol"
                description="A list of social groups in Bristol that meet up regularly and are open to newcomers."
            />
            <div className={styles.hero}>
                <h1 className={styles.title}>Social Bristol</h1>
                <p className={styles.description}>
                    Welcome to Social Bristol! This website lists social groups
                    in Bristol that meet up regularly and are open to newcomers
                    - it&apos;s a{' '}
                    <Link className={styles.link} href="/about">
                        work in progress site
                    </Link>
                    , with many more events still to be listed. Filter by tag or
                    scroll through the listed events.
                </p>
                <p className={styles.eventFilterTitle}>Filter by events</p>
                <div className={styles.eventTags}>
                    {Object.keys(eventTags).map(
                        (tag: string, index: number) => (
                            <div key={index} className={styles.eventTagFilter}>
                                <input
                                    type="checkbox"
                                    id={`event-tag-checkbox-${tag}`}
                                    checked={selectedEventTags.includes(tag)}
                                    onChange={() =>
                                        handleEventFilterClicked(tag)
                                    }
                                    className={styles.eventTagFilter__checkbox}
                                />
                                <label
                                    htmlFor={`event-tag-checkbox-${tag}`}
                                    className={styles.eventTagFilter__label}
                                >
                                    {`${tag} (${eventTags[tag]})`}
                                </label>
                            </div>
                        ),
                    )}
                </div>

                <button
                    className={styles.clearSelectedTagsButton}
                    onClick={() => setSelectedEventTags([])}
                    disabled={selectedEventTags.length === 0}
                >
                    Clear selected filters
                </button>
            </div>

            <div className={styles.events}>
                {filteredEvents.map((event: any, index: number) => (
                    <EventCard key={index} {...event} />
                ))}
            </div>
        </Layout>
    );
}

const EVENT_DETAILS_PATH = join(process.cwd(), 'data/events');

export const getStaticProps = async () => {
    const paths = getDirectories(EVENT_DETAILS_PATH);

    const events = paths.map((path: string) => {
        const fullEventPath = join(EVENT_DETAILS_PATH, path, 'details.json');
        const eventData = JSON.parse(
            fs.readFileSync(fullEventPath, { encoding: 'utf8' }),
        );

        return eventData;
    });

    return {
        props: {
            events,
        },
    };
};
