import React from 'react';
import Link from 'next/link';
import { ClockIcon } from '@/components/Icons/ClockIcon';
import { WalletIcon } from '@/components/Icons/WalletIcon';
import { LocationIcon } from '@/components/Icons/LocationIcon';
import { ReceiptIcon } from '@/components/Icons/ReceiptIcon';
import { ExternalIcon } from '@/components/Icons/ExternalIcon';
import { getAMPMTimeFromDateString } from '@/utils/utils';
import { Event } from '@/types/types';
import styles from './EventCard.module.scss';

const EventCard = ({
    cost,
    time,
    location,
    locationURL,
    booking,
    url,
}: Event) => {
    return (
        <div className={styles.details}>
            {time && (
                <div className={styles.details__item}>
                    <ClockIcon className={styles.details__icon} />
                    <p>
                        {time.frequency === 'Weekly' ? (
                            <>
                                Every <strong>{time.weekday}</strong>
                            </>
                        ) : (
                            <strong>{time.frequency}</strong>
                        )}{' '}
                        from{' '}
                        <strong>{getAMPMTimeFromDateString(time.start)}</strong>{' '}
                        to{' '}
                        <strong>{getAMPMTimeFromDateString(time.end)}</strong>
                    </p>
                </div>
            )}
            {cost && (
                <div className={styles.details__item}>
                    <WalletIcon className={styles.details__icon} />
                    <p>
                        Costs <strong>£{cost.sessionPrice.toFixed(2)}</strong>{' '}
                        per session
                    </p>
                </div>
            )}
            {booking && (
                <div className={styles.details__item}>
                    <ReceiptIcon className={styles.details__icon} />
                    <p>
                        {booking.required ? (
                            <strong>Advance booking required</strong>
                        ) : (
                            'No advance booking required'
                        )}
                    </p>
                </div>
            )}
            <div className={styles.details__item}>
                <LocationIcon className={styles.details__icon} />
                <div className={styles.locationContainer}>
                    {location && (
                        <p>
                            Located at{' '}
                            <a
                                className={styles.googleMapsLink}
                                href={location.googleMapsLink}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {location.address}
                                <ExternalIcon />
                            </a>
                        </p>
                    )}
                    {locationURL && (
                        <p>
                            This event&apos;s location changes,{' '}
                            <Link
                                href={locationURL}
                                className={styles.googleMapsLink}
                                target="_blank"
                                rel="noreferrer"
                            >
                                click here for the latest details
                                <ExternalIcon />
                            </Link>
                        </p>
                    )}
                </div>
            </div>
            <div className={styles.details__item}>
                <a
                    className={styles.externalLink}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                >
                    View event host&apos;s website <ExternalIcon />
                </a>
            </div>
        </div>
    );
};

export default EventCard;
