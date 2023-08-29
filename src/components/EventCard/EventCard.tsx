import React from 'react';
import { ClockIcon } from '@/components/Icons/ClockIcon';
import { WalletIcon } from '@/components/Icons/WalletIcon';
import { LocationIcon } from '@/components/Icons/LocationIcon';
import { ReceiptIcon } from '@/components/Icons/ReceiptIcon';
import { EventLocation, EventTime } from '@/types/types';
import dynamic from 'next/dynamic';
import styles from './EventCard.module.scss';
import { ExternalIcon } from '../Icons/ExternalIcon';

const Map = dynamic(() => import('../Map/index'), { ssr: false });

type EventCardProps = {
    name: string;
    description: string;
    cost: number;
    time: EventTime;
    location: EventLocation;
    bookingRequired: boolean;
};

const EventCard = ({
    name,
    description,
    cost,
    time,
    location,
    bookingRequired,
}: EventCardProps) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{name}</h2>

            <p className={styles.description}>{description}</p>

            <div className={styles.details}>
                <div className={styles.details__item}>
                    <ClockIcon className={styles.details__icon} />
                    <p>
                        Every <strong>{time.weekday}</strong> from{' '}
                        <strong>{time.start}</strong> to{' '}
                        <strong>{time.end}</strong>
                    </p>
                </div>
                <div className={styles.details__item}>
                    <WalletIcon className={styles.details__icon} />
                    <p>
                        Costs <strong>£{cost}</strong> per session
                    </p>
                </div>
                <div className={styles.details__item}>
                    <ReceiptIcon className={styles.details__icon} />
                    <p>
                        {bookingRequired
                            ? 'Advance booking required'
                            : 'No advance booking required'}
                    </p>
                </div>
                <div className={styles.details__item}>
                    <LocationIcon className={styles.details__icon} />
                    <p>
                        Located at <strong>{location.address}</strong>
                    </p>
                </div>
                <Map
                    longitude={parseFloat(location.longitude)}
                    latitude={parseFloat(location.latitude)}
                    address={location.address}
                />
                <a
                    className={styles.googleMapsLink}
                    href={location.googleMapsLink}
                >
                    Open in Google Maps <ExternalIcon />
                </a>
            </div>
        </div>
    );
};

export default EventCard;
