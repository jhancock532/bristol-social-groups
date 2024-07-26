import fs from 'fs';
import { join } from 'path';
import dynamic from 'next/dynamic';

import Layout from '@/components/Layout';
import Metadata from '@/components/Metadata';
import AdHocCard from '@/components/AdHocCard';
import DiscordCard from '@/components/DiscordCard';
import { ClockIcon } from '@/components/Icons/ClockIcon';
import { ReceiptIcon } from '@/components/Icons/ReceiptIcon';
import { WalletIcon } from '@/components/Icons/WalletIcon';
import { LocationIcon } from '@/components/Icons/LocationIcon';
import { ExternalIcon } from '@/components/Icons/ExternalIcon';
import { get24HourTimeFromDateString, getDirectories } from '@/utils/utils';

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
    event: any;
    sectionTitleHeadingLevel: 'h2' | 'h3';
}) => {
    const timeSectionTitle = `${event.time.frequency === 'Weekly' ? `Every ${event.time.weekday}` : event.time.frequency} from ${get24HourTimeFromDateString(event.time.start)} to
                ${get24HourTimeFromDateString(event.time.end)}`;

    return (
        <div>
            {/* Only display the name of the event if there are multiple events */}
            {event.name && sectionTitleHeadingLevel !== 'h2' && (
                <h2 className={styles.event__title}>{event.name}</h2>
            )}

            {event.description && (
                <p className={styles.event__description}>{event.description}</p>
            )}

            {event.details && (
                <p className={styles.event__description}>{event.details}</p>
            )}

            <p>
                <a
                    href={event.url}
                    target="_blank"
                    className={styles.eventDetails__url}
                >
                    Visit the <strong>group&apos;s website</strong>{' '}
                    <ExternalIcon />
                </a>
            </p>

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
                        longitude={event.location.longitude}
                        latitude={event.location.latitude}
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

            <EventDetailsSection
                title={`Costs £${event.cost.sessionPrice} per
                session`}
                details={event.cost?.details}
                Icon={WalletIcon}
                headingLevel={sectionTitleHeadingLevel}
            />

            <EventDetailsSection
                title={
                    event.booking.required
                        ? 'Advance booking required'
                        : 'No advance booking required'
                }
                details={event.booking?.details}
                Icon={ReceiptIcon}
                headingLevel={sectionTitleHeadingLevel}
            />

            {event.accessibility && (
                <EventDetailsSection
                    title="Accessibility notes"
                    details={event.accessibility.details}
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
            <p className={styles.description}>{data.description}</p>

            {data.events &&
                (data.events.length > 1 ? (
                    data.events.map((event: any, index: number) => {
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

            {data.type === 'Discord' && (
                <div className={styles.discordContainer}>
                    <p>
                        Discord groups organize events via group chats. To take
                        part and learn more about the events hosted, click on
                        the invite link. If you don&apos;t have a Discord
                        account already, it&apos;s free to sign up.
                    </p>
                    <DiscordCard url={data.url} />
                </div>
            )}

            {data.type === 'Ad-hoc' && (
                <div className={styles.discordContainer}>
                    <AdHocCard url={data.url} />
                </div>
            )}
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
