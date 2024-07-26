import React from 'react';
import Link from 'next/link';
import { ClockIcon } from '@/components/Icons/ClockIcon';
import { WalletIcon } from '@/components/Icons/WalletIcon';
import { LocationIcon } from '@/components/Icons/LocationIcon';
import { ReceiptIcon } from '@/components/Icons/ReceiptIcon';
import { ExternalIcon } from '@/components/Icons/ExternalIcon';
import { FemaleIcon } from '@/components/Icons/FemaleIcon';
import { MaleIcon } from '@/components/Icons/MaleIcon';
import { getAMPMTimeFromDateString } from '@/utils/utils';
import { Event } from '@/types/Event';
import styles from './EventCard.module.scss';

const EventCard = ({
    cost,
    time,
    location,
    locationURL,
    booking,
    url,
    gender,
}: Event) => {
    return (
        <div className={styles.details}>
            {gender && (
                <div className={styles.details__item}>
                    {gender === 'Women' && (
                        <FemaleIcon className={styles.details__icon} />
                    )}
                    {gender === 'Men' && (
                        <MaleIcon className={styles.details__icon} />
                    )}
                    <p>Open to {gender.toLowerCase()} only.</p>
                </div>
            )}
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
            {booking && booking.required && (
                <div className={styles.details__item}>
                    <ReceiptIcon className={styles.details__icon} />
                    <p>
                        {booking.required === 'Advised' ? (
                            <span>Advance booking advised</span>
                        ) : (
                            <strong>Advance booking required</strong>
                        )}
                    </p>
                </div>
            )}
            <div className={styles.details__item}>
                <LocationIcon className={styles.details__icon} />
                <div className={styles.locationContainer}>
                    {location && (
                        <p>
                            Meets at{' '}
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
                    View group&apos;s website <ExternalIcon />
                </a>
            </div>
        </div>
    );
};

export default EventCard;
