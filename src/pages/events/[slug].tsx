import fs from 'fs';
import { join } from 'path';
import dynamic from 'next/dynamic';

import Layout from '@/components/Layout';
import Metadata from '@/components/Metadata';
import { ClockIcon } from '@/components/Icons/ClockIcon';
import { ReceiptIcon } from '@/components/Icons/ReceiptIcon';
import { WalletIcon } from '@/components/Icons/WalletIcon';
import { LocationIcon } from '@/components/Icons/LocationIcon';
import { get24HourTimeFromDateString, getDirectories } from '@/utils/utils';

import styles from './EventPage.module.scss';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const EVENTS_PATH = join(process.cwd(), 'data/events/');

const EventDetailsSection = ({
    title,
    details,
    children,
    Icon,
    headingLevel = 'h2',
}: any) => {
    const HeadingTag = headingLevel;

    return (
        <div className={styles.section}>
            <HeadingTag className={styles.sectionTitle}>
                {Icon && <Icon className={styles.icon} />}
                {title}
            </HeadingTag>

            {details && <p className={styles.details}>{details}</p>}

            {children}
        </div>
    );
};

/**
 * Renders all of the event details - accepts a heading level parameter
 * to allow for multiple events to be rendered on the same page, separated
 * by a <h2> title referencing `event.name`. Note if event.name is not
 * provided, this component won't meet accessibility criteria and fail.
 */
const Event = ({
    event,
    sectionTitleHeadingLevel,
}: {
    event: any;
    sectionTitleHeadingLevel: 'h2' | 'h3';
}) => {
    const timeSectionTitle =
        event.time.frequency === 'Weekly'
            ? `Every ${event.time.weekday}`
            : `${event.time.frequency}
                from ${get24HourTimeFromDateString(event.time.start)} to
                ${get24HourTimeFromDateString(event.time.end)}`;

    if (event.name && sectionTitleHeadingLevel === 'h2') {
        throw Error("`event.name` provided for event that doesn't need one");
    }

    return (
        <div>
            {event.name && <h2>{event.name}</h2>}
            {event.description && <p>{event.description}</p>}

            <EventDetailsSection
                title={timeSectionTitle}
                details={event.time?.details}
                Icon={ClockIcon}
                headingLevel={sectionTitleHeadingLevel}
            >
                <button>Add to calendar</button>
            </EventDetailsSection>

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

            <EventDetailsSection
                title="Location"
                details={event.location?.details}
                Icon={LocationIcon}
                headingLevel={sectionTitleHeadingLevel}
            >
                <Map
                    longitude={event.location.longitude}
                    latitude={event.location.latitude}
                    address={event.location.address}
                />
                <a href={event.location.googleMapsLink} target="_blank">
                    Open in Google Maps
                </a>
            </EventDetailsSection>

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
            <h1>{data.name}</h1>
            <div>{data.description}</div>

            {data.events.length > 1 ? (
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
                <Event event={data.events[0]} sectionTitleHeadingLevel="h2" />
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
