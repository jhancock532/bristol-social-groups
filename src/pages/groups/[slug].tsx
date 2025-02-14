import fs from 'fs';
import { join } from 'path';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import Metadata from '@/components/Metadata';
import SubscriptionText from '@/components/SubscriptionText';
import { GroupLinks } from '@/components/GroupCard/GroupCard';
import { AccessibilityIcon } from '@/components/Icons/AccessibilityIcon';
import { ClockIcon } from '@/components/Icons/ClockIcon';
import { ExternalIcon } from '@/components/Icons/ExternalIcon';
import { LocationIcon } from '@/components/Icons/LocationIcon';
import { ReceiptIcon } from '@/components/Icons/ReceiptIcon';
import { WalletIcon } from '@/components/Icons/WalletIcon';
import { get24HourTimeFromDateString, getDirectories } from '@/utils/utils';
import { Event as EventType } from '@/types/Event';

import styles from './EventPage.module.scss';

const Map = dynamic(() => import('@/components/SingleMarkerMap'), {
    ssr: false,
});

const EVENTS_PATH = join(process.cwd(), 'data/groups/');

const EventDetailsSection = ({
    title,
    details,
    children,
    Icon,
    headingLevel = 'h2',
}: any) => {
    const HeadingTag = headingLevel;

    return (
        <div className={styles.eventDetails}>
            <HeadingTag className={styles.eventDetails__heading}>
                {Icon && <Icon className={styles.eventDetails__icon} />}
                <span className={styles.eventDetails__title}>{title}</span>
            </HeadingTag>

            {details && (
                <p className={styles.eventDetails__description}>{details}</p>
            )}

            {children}
        </div>
    );
};

/**
 * Renders all of the event details - accepts a heading level parameter
 * to allow for multiple events to be rendered on the same page, separated
 * by a <h2> title referencing `event.name`.
 */
const Event = ({
    event,
    sectionTitleHeadingLevel,
}: {
    event: EventType;
    sectionTitleHeadingLevel: 'h2' | 'h3';
}) => {
    const timeSectionTitle =
        event.time &&
        `${event.time.frequency === 'Weekly' ? `Every ${event.time.weekday}` : event.time.frequency} from ${get24HourTimeFromDateString(event.time.start)} to
                ${get24HourTimeFromDateString(event.time.end)}`;

    return (
        <div>
            {/* Only display the name of the event if there are multiple events */}
            {event.name && sectionTitleHeadingLevel !== 'h2' && (
                <h2 className={styles.event__title}>{event.name}</h2>
            )}

            {event.details && (
                <p className={styles.event__description}>{event.details}</p>
            )}

            {event.link && event.link.url && (
                <p>
                    <a
                        href={event.link.url}
                        target="_blank"
                        className={styles.eventDetails__url}
                    >
                        Visit the <strong>website for this event</strong>{' '}
                        <ExternalIcon />
                    </a>
                </p>
            )}

            <EventDetailsSection
                title={timeSectionTitle}
                details={event.time?.details}
                Icon={ClockIcon}
                headingLevel={sectionTitleHeadingLevel}
            ></EventDetailsSection>

            {event.locationURL && (
                <EventDetailsSection
                    title="Location details"
                    Icon={LocationIcon}
                    headingLevel={sectionTitleHeadingLevel}
                >
                    <p>
                        {' '}
                        This event location changes regularly.
                        <a
                            className={styles.event__googleMapsLink}
                            href={event.locationURL}
                            target="_blank"
                        >
                            Please click here to find out the next location{' '}
                            <ExternalIcon />
                        </a>
                    </p>
                </EventDetailsSection>
            )}

            {event.location && (
                <EventDetailsSection
                    title="Location"
                    details={event.location?.details || event.location?.address}
                    Icon={LocationIcon}
                    headingLevel={sectionTitleHeadingLevel}
                >
                    <Map
                        longitude={parseFloat(event.location.longitude)}
                        latitude={parseFloat(event.location.latitude)}
                        address={event.location.address}
                    />
                    <a
                        className={styles.event__googleMapsLink}
                        href={event.location.googleMapsLink}
                        target="_blank"
                    >
                        Open in Google Maps <ExternalIcon />
                    </a>
                </EventDetailsSection>
            )}

            {event.cost && (
                <EventDetailsSection
                    title={`Costs £${event.cost.sessionPrice} per
                session`}
                    details={event.cost?.details}
                    Icon={WalletIcon}
                    headingLevel={sectionTitleHeadingLevel}
                />
            )}

            {event.booking && (
                <EventDetailsSection
                    title={
                        'Booking ' + event.booking.required.toLocaleLowerCase()
                    }
                    details={event.booking?.details}
                    Icon={ReceiptIcon}
                    headingLevel={sectionTitleHeadingLevel}
                />
            )}

            {event.accessibility && (
                <EventDetailsSection
                    title="Accessibility"
                    details={event.accessibility}
                    Icon={AccessibilityIcon}
                    headingLevel={'h3'}
                />
            )}
        </div>
    );
};

const EventPage = ({ data }: { data: any }) => {
    return (
        <Layout>
            <Metadata title={data.name} description={data.description} />
            <h1 className={styles.title}>{data.name}</h1>
            <p className={styles.description}>{data.description} </p>

            {data.subscriptions && (
                <SubscriptionText subscriptions={data.subscriptions} />
            )}

            {data.details && <p>{data.details}</p>}

            {data.events === undefined ? (
                <div className={styles.adhocSection}>
                    <p>
                        Events are organized on an ad-hoc basis. Please see the
                        below links to find out when the next event will be run.
                    </p>
                    <GroupLinks links={data.links} />
                </div>
            ) : (
                <GroupLinks links={data.links} />
            )}

            {data.events &&
                (data.events.length > 1 ? (
                    data.events.map((event: EventType, index: number) => {
                        return (
                            <Event
                                event={event}
                                sectionTitleHeadingLevel="h3"
                                key={index}
                            />
                        );
                    })
                ) : (
                    <Event
                        event={data.events[0]}
                        sectionTitleHeadingLevel="h2"
                    />
                ))}
        </Layout>
    );
};

export const getStaticPaths = async () => {
    const paths: any[] = [];

    getDirectories(EVENTS_PATH).forEach((event) => {
        paths.push({
            params: { slug: event },
        });
    });

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({
    params,
}: {
    params: { slug: string };
}) => {
    const eventFilePath = join(EVENTS_PATH, `${params.slug}/details.json`);
    const data = JSON.parse(
        fs.readFileSync(eventFilePath, { encoding: 'utf8' }),
    );

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: { data },
    };
};

export default EventPage;
