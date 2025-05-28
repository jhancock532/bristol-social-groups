import { GetStaticProps } from 'next';
import { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import Metadata from '@/components/Metadata';
import fs from 'fs';
import path from 'path';
import styles from './EventLocations.module.scss';

// Types for our data
interface LocationData {
    'Venue': string;
    'Time': string;
    'Day': string;
    'Recurring Frequency': string;
}

interface TimeAnalysis {
    startTime: string | null;
    endTime: string | null;
    duration: number | null; // in minutes
    startHour: number | null; // for chart visualization
}

interface LocationsProps {
    data: LocationData[];
}

export default function Locations({ data }: LocationsProps) {
    // State for accordion functionality
    const [expandedVenues, setExpandedVenues] = useState<Set<string>>(
        new Set(),
    );

    // Function to toggle venue expansion
    const toggleVenue = (venue: string) => {
        const newExpanded = new Set(expandedVenues);
        if (newExpanded.has(venue)) {
            newExpanded.delete(venue);
        } else {
            newExpanded.add(venue);
        }
        setExpandedVenues(newExpanded);
    };

    // Group events by venue
    const eventsByVenue = useMemo(() => {
        const grouped: Record<string, LocationData[]> = {};
        data.forEach((event) => {
            if (!grouped[event.Venue]) {
                grouped[event.Venue] = [];
            }
            grouped[event.Venue].push(event);
        });
        return grouped;
    }, [data]);

    // Parse time strings to extract start/end times
    const parseTime = (timeStr: string): TimeAnalysis => {
        // Handle various time formats
        const timeClean = timeStr.replace(/\(.*?\)/g, '').trim(); // Remove parentheses content

        // Check for time ranges with –, -, or to
        const rangeMatch =
            timeClean.includes('–') ||
            timeClean.includes('-') ||
            timeClean.toLowerCase().includes(' to ');

        let startTime: string | null = null;
        let endTime: string | null = null;

        if (rangeMatch) {
            // Time range - split by common separators
            // eslint-disable-next-line no-useless-escape
            const parts = timeClean.split(/[–\-]|to/i);
            if (parts.length >= 2) {
                const startMatch = parts[0].match(
                    /(\d{1,2}:\d{2}\s*(?:AM|PM))/i,
                );
                const endMatch = parts[1].match(/(\d{1,2}:\d{2}\s*(?:AM|PM))/i);
                startTime = startMatch ? startMatch[1] : null;
                endTime = endMatch ? endMatch[1] : null;
            }
        } else {
            // Single time or "starts at" format
            const startsAtMatch = timeClean.match(
                /starts?\s+at\s+(\d{1,2}:\d{2}\s*(?:AM|PM))/i,
            );
            const singleTimeMatch = timeClean.match(
                /(\d{1,2}:\d{2}\s*(?:AM|PM))/i,
            );

            if (startsAtMatch) {
                startTime = startsAtMatch[1];
            } else if (singleTimeMatch) {
                startTime = singleTimeMatch[1];
            }
        }

        // Convert to 24-hour format for calculations
        const convertTo24Hour = (time12: string): number | null => {
            const match = time12.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
            if (!match) return null;

            let hours = parseInt(match[1], 10);
            const minutes = parseInt(match[2], 10);
            const ampm = match[3].toUpperCase();

            if (ampm === 'PM' && hours !== 12) hours += 12;
            if (ampm === 'AM' && hours === 12) hours = 0;

            return hours + minutes / 60;
        };

        const startHour = startTime ? convertTo24Hour(startTime) : null;
        const endHour = endTime ? convertTo24Hour(endTime) : null;

        let duration: number | null = null;
        if (startHour !== null && endHour !== null) {
            duration = (endHour - startHour) * 60; // in minutes
            if (duration < 0) duration += 24 * 60; // Handle overnight events
        }

        return { startTime, endTime, duration, startHour };
    };

    // Frequency analysis
    const frequencyAnalysis = useMemo(() => {
        if (!data.length) return { venues: {}, days: {}, frequencies: {} };

        const venues: Record<string, number> = {};
        const days: Record<string, number> = {};
        const frequencies: Record<string, number> = {};

        data.forEach((item) => {
            // Count venues
            venues[item.Venue] = (venues[item.Venue] || 0) + 1;

            // Count days
            days[item.Day] = (days[item.Day] || 0) + 1;

            // Count frequencies
            frequencies[item['Recurring Frequency']] =
                (frequencies[item['Recurring Frequency']] || 0) + 1;
        });

        return { venues, days, frequencies };
    }, [data]);

    // Time analysis
    const timeAnalysis = useMemo(() => {
        if (!data.length)
            return { startTimes: {}, durations: [], validTimes: [] };

        const startTimes: Record<number, number> = {}; // hour -> count
        const durations: number[] = [];
        const validTimes: TimeAnalysis[] = [];

        data.forEach((item) => {
            const analysis = parseTime(item.Time);
            validTimes.push(analysis);

            if (analysis.startHour !== null) {
                const hourKey = Math.floor(analysis.startHour);
                startTimes[hourKey] = (startTimes[hourKey] || 0) + 1;
            }

            if (analysis.duration !== null && analysis.duration > 0) {
                durations.push(analysis.duration);
            }
        });

        return { startTimes, durations, validTimes };
    }, [data]);

    // Helper function to get top N items from frequency object
    const getTopItems = (obj: Record<string, number>, n = 10) => {
        return Object.entries(obj)
            .sort(([, a], [, b]) => b - a)
            .slice(0, n);
    };

    const topVenues = getTopItems(frequencyAnalysis.venues, 200);
    const topDays = getTopItems(frequencyAnalysis.days, 25);
    const topFrequencies = getTopItems(frequencyAnalysis.frequencies, 25);

    return (
        <Layout>
            <Metadata
                title="Bristol Social Groups - Locations Analysis"
                description="Analysis and visualization of Bristol social group locations and timing data."
            />
            <div className={styles.hero}>
                <h1 className={styles.title}>Event Locations Analysis</h1>
                <p className={styles.description}>
                    Analysis of {data.length} event locations across Bristol, as
                    found by mysterious means.
                </p>

                {/* Venue Frequency Analysis */}
                <section
                    className={`${styles['event-locations__section']} ${styles['event-locations__section--first']}`}
                >
                    <h2 className={styles['event-locations__section-title']}>
                        Most Frequently Occurring Venues
                    </h2>
                    <div className={styles['event-locations__list']}>
                        {topVenues.map(([venue, count], index) => (
                            <div
                                key={venue}
                                className={
                                    styles['event-locations__accordion-item']
                                }
                            >
                                <div
                                    className={`${styles['event-locations__list-item']} ${styles['event-locations__list-item--clickable']} ${
                                        index % 2 === 0
                                            ? styles[
                                                  'event-locations__list-item--even'
                                              ]
                                            : styles[
                                                  'event-locations__list-item--odd'
                                              ]
                                    } ${
                                        expandedVenues.has(venue)
                                            ? styles[
                                                  'event-locations__list-item--expanded'
                                              ]
                                            : ''
                                    }`}
                                    onClick={() => toggleVenue(venue)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === 'Enter' ||
                                            e.key === ' '
                                        ) {
                                            e.preventDefault();
                                            toggleVenue(venue);
                                        }
                                    }}
                                >
                                    <span
                                        className={
                                            styles[
                                                'event-locations__list-item-label'
                                            ]
                                        }
                                    >
                                        {venue}
                                    </span>
                                    <div
                                        className={
                                            styles[
                                                'event-locations__list-item-right'
                                            ]
                                        }
                                    >
                                        <span
                                            className={`${styles['event-locations__badge']} ${styles['event-locations__badge--venue']}`}
                                        >
                                            {count} events
                                        </span>
                                        <span
                                            className={`${styles['event-locations__accordion-arrow']} ${
                                                expandedVenues.has(venue)
                                                    ? styles[
                                                          'event-locations__accordion-arrow--expanded'
                                                      ]
                                                    : ''
                                            }`}
                                        >
                                            ▼
                                        </span>
                                    </div>
                                </div>

                                {expandedVenues.has(venue) && (
                                    <div
                                        className={
                                            styles[
                                                'event-locations__accordion-content'
                                            ]
                                        }
                                    >
                                        <pre
                                            className={
                                                styles[
                                                    'event-locations__json-display'
                                                ]
                                            }
                                        >
                                            {JSON.stringify(
                                                eventsByVenue[venue] || [],
                                                null,
                                                2,
                                            )}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Day Frequency Analysis */}
                <section className={styles['event-locations__section']}>
                    <h2 className={styles['event-locations__section-title']}>
                        Most Common Days
                    </h2>
                    <div className={styles['event-locations__list']}>
                        {topDays.map(([day, count], index) => (
                            <div
                                key={day}
                                className={`${styles['event-locations__list-item']} ${
                                    index % 2 === 0
                                        ? styles[
                                              'event-locations__list-item--even'
                                          ]
                                        : styles[
                                              'event-locations__list-item--odd'
                                          ]
                                }`}
                            >
                                <span
                                    className={
                                        styles[
                                            'event-locations__list-item-label'
                                        ]
                                    }
                                >
                                    {day}
                                </span>
                                <span
                                    className={`${styles['event-locations__badge']} ${styles['event-locations__badge--day']}`}
                                >
                                    {count} events
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Frequency Analysis */}
                <section className={styles['event-locations__section']}>
                    <h2 className={styles['event-locations__section-title']}>
                        Event Frequencies
                    </h2>
                    <div className={styles['event-locations__list']}>
                        {topFrequencies.map(([frequency, count], index) => (
                            <div
                                key={frequency}
                                className={`${styles['event-locations__list-item']} ${
                                    index % 2 === 0
                                        ? styles[
                                              'event-locations__list-item--even'
                                          ]
                                        : styles[
                                              'event-locations__list-item--odd'
                                          ]
                                }`}
                            >
                                <span
                                    className={
                                        styles[
                                            'event-locations__list-item-label'
                                        ]
                                    }
                                >
                                    {frequency}
                                </span>
                                <span
                                    className={`${styles['event-locations__badge']} ${styles['event-locations__badge--frequency']}`}
                                >
                                    {count} events
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Start Time Distribution */}
                <section className={styles['event-locations__section']}>
                    <h2 className={styles['event-locations__section-title']}>
                        Start Time Distribution
                    </h2>
                    <p
                        className={
                            styles['event-locations__section-description']
                        }
                    >
                        Distribution of event start times throughout the day
                    </p>
                    <div className={styles['event-locations__chart']}>
                        {Object.entries(timeAnalysis.startTimes)
                            .sort(
                                ([a], [b]) => parseInt(a, 10) - parseInt(b, 10),
                            )
                            .map(([hour, count]) => {
                                const hourNum = parseInt(hour, 10);
                                const displayHour =
                                    hourNum === 0
                                        ? '12 AM'
                                        : hourNum < 12
                                          ? `${hourNum} AM`
                                          : hourNum === 12
                                            ? '12 PM'
                                            : `${hourNum - 12} PM`;
                                const maxCount = Math.max(
                                    ...Object.values(timeAnalysis.startTimes),
                                );
                                const width = (count / maxCount) * 100;

                                return (
                                    <div
                                        key={hour}
                                        className={
                                            styles['event-locations__chart-row']
                                        }
                                    >
                                        <span
                                            className={
                                                styles[
                                                    'event-locations__chart-label'
                                                ]
                                            }
                                        >
                                            {displayHour}
                                        </span>
                                        <div
                                            className={
                                                styles[
                                                    'event-locations__chart-bar-container'
                                                ]
                                            }
                                        >
                                            <div
                                                className={
                                                    styles[
                                                        'event-locations__chart-bar'
                                                    ]
                                                }
                                                style={{
                                                    width: `${width}%`,
                                                    minWidth:
                                                        width > 15
                                                            ? 'auto'
                                                            : '0',
                                                }}
                                            >
                                                {width > 15 && count}
                                            </div>
                                        </div>
                                        <span
                                            className={
                                                styles[
                                                    'event-locations__chart-count'
                                                ]
                                            }
                                        >
                                            {count}
                                        </span>
                                    </div>
                                );
                            })}
                    </div>
                </section>

                {/* Duration Analysis */}
                <section className={styles['event-locations__section']}>
                    <h2 className={styles['event-locations__section-title']}>
                        Event Duration Analysis
                    </h2>
                    <div
                        className={`${styles['event-locations__stats-grid']} ${styles['event-locations__stats-grid--duration']}`}
                    >
                        <div
                            className={`${styles['event-locations__stat-card']} ${styles['event-locations__stat-card--general']}`}
                        >
                            <h3
                                className={`${styles['event-locations__stat-title']} ${styles['event-locations__stat-title--general']}`}
                            >
                                Events with duration
                            </h3>
                            <p
                                className={`${styles['event-locations__stat-value']} ${styles['event-locations__stat-value--general']}`}
                            >
                                {timeAnalysis.durations.length}
                            </p>
                            <p
                                className={
                                    styles['event-locations__stat-subtitle']
                                }
                            >
                                out of {data.length} total
                            </p>
                        </div>

                        {timeAnalysis.durations.length > 0 && (
                            <>
                                <div
                                    className={`${styles['event-locations__stat-card']} ${styles['event-locations__stat-card--general']}`}
                                >
                                    <h3
                                        className={`${styles['event-locations__stat-title']} ${styles['event-locations__stat-title--general']}`}
                                    >
                                        Average duration
                                    </h3>
                                    <p
                                        className={`${styles['event-locations__stat-value']} ${styles['event-locations__stat-value--green']}`}
                                    >
                                        {Math.round(
                                            timeAnalysis.durations.reduce(
                                                (a, b) => a + b,
                                                0,
                                            ) / timeAnalysis.durations.length,
                                        )}
                                    </p>
                                    <p
                                        className={
                                            styles[
                                                'event-locations__stat-subtitle'
                                            ]
                                        }
                                    >
                                        minutes
                                    </p>
                                </div>

                                <div
                                    className={`${styles['event-locations__stat-card']} ${styles['event-locations__stat-card--general']}`}
                                >
                                    <h3
                                        className={`${styles['event-locations__stat-title']} ${styles['event-locations__stat-title--general']}`}
                                    >
                                        Shortest event
                                    </h3>
                                    <p
                                        className={`${styles['event-locations__stat-value']} ${styles['event-locations__stat-value--red']}`}
                                    >
                                        {Math.min(...timeAnalysis.durations)}
                                    </p>
                                    <p
                                        className={
                                            styles[
                                                'event-locations__stat-subtitle'
                                            ]
                                        }
                                    >
                                        minutes
                                    </p>
                                </div>

                                <div
                                    className={`${styles['event-locations__stat-card']} ${styles['event-locations__stat-card--general']}`}
                                >
                                    <h3
                                        className={`${styles['event-locations__stat-title']} ${styles['event-locations__stat-title--general']}`}
                                    >
                                        Longest event
                                    </h3>
                                    <p
                                        className={`${styles['event-locations__stat-value']} ${styles['event-locations__stat-value--purple']}`}
                                    >
                                        {Math.max(...timeAnalysis.durations)}
                                    </p>
                                    <p
                                        className={
                                            styles[
                                                'event-locations__stat-subtitle'
                                            ]
                                        }
                                    >
                                        minutes
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </section>

                {/* Summary Stats */}
                <section className={styles['event-locations__section']}>
                    <h2 className={styles['event-locations__section-title']}>
                        Summary Statistics
                    </h2>
                    <div className={styles['event-locations__stats-grid']}>
                        <div
                            className={`${styles['event-locations__stat-card']} ${styles['event-locations__stat-card--primary']}`}
                        >
                            <h3
                                className={`${styles['event-locations__stat-title']} ${styles['event-locations__stat-title--primary']}`}
                            >
                                Total Events
                            </h3>
                            <p
                                className={`${styles['event-locations__stat-value']} ${styles['event-locations__stat-value--primary']}`}
                            >
                                {data.length}
                            </p>
                        </div>

                        <div
                            className={`${styles['event-locations__stat-card']} ${styles['event-locations__stat-card--success']}`}
                        >
                            <h3
                                className={`${styles['event-locations__stat-title']} ${styles['event-locations__stat-title--success']}`}
                            >
                                Unique Venues
                            </h3>
                            <p
                                className={`${styles['event-locations__stat-value']} ${styles['event-locations__stat-value--success']}`}
                            >
                                {Object.keys(frequencyAnalysis.venues).length}
                            </p>
                        </div>

                        <div
                            className={`${styles['event-locations__stat-card']} ${styles['event-locations__stat-card--warning']}`}
                        >
                            <h3
                                className={`${styles['event-locations__stat-title']} ${styles['event-locations__stat-title--warning']}`}
                            >
                                Day Variations
                            </h3>
                            <p
                                className={`${styles['event-locations__stat-value']} ${styles['event-locations__stat-value--warning']}`}
                            >
                                {Object.keys(frequencyAnalysis.days).length}
                            </p>
                        </div>

                        <div
                            className={`${styles['event-locations__stat-card']} ${styles['event-locations__stat-card--purple']}`}
                        >
                            <h3
                                className={`${styles['event-locations__stat-title']} ${styles['event-locations__stat-title--purple']}`}
                            >
                                Frequency Types
                            </h3>
                            <p
                                className={`${styles['event-locations__stat-value']} ${styles['event-locations__stat-value--purple']}`}
                            >
                                {
                                    Object.keys(frequencyAnalysis.frequencies)
                                        .length
                                }
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps<LocationsProps> = async () => {
    try {
        const filePath = path.join(
            process.cwd(),
            'data',
            'sources',
            'locations.json',
        );
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const data: LocationData[] = JSON.parse(jsonData);

        return {
            props: {
                data,
            },
        };
    } catch (error) {
        console.error('Error loading locations data:', error);
        return {
            props: {
                data: [],
            },
        };
    }
};
