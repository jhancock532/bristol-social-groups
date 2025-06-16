import React from 'react';
import Link from '@/components/Link';
import { ClockIcon } from '@/components/Icons/ClockIcon';
import { FemaleIcon } from '@/components/Icons/FemaleIcon';
import { LinkIcon } from '@/components/Icons/LinkIcon';
import { LocationIcon } from '@/components/Icons/LocationIcon';
import { MaleIcon } from '@/components/Icons/MaleIcon';
import { PeopleIcon } from '@/components/Icons/PeopleIcon';
import { ReceiptIcon } from '@/components/Icons/ReceiptIcon';
import { WalletIcon } from '@/components/Icons/WalletIcon';
import { getAMPMTimeFromDateString } from '@/utils/utils';
import { Event } from '@/types/Event';

import styles from './EventCard.module.scss';

const EventCard = ({
    name,
    cost,
    time,
    location,
    locationURL,
    booking,
    link,
    gender,
}: Event) => {
    return (
        <div className={styles.details}>
            {name && <h3 className={styles.details__title}>{name}</h3>}
            {gender && (
                <div className={styles.details__item}>
                    {gender === 'Women' && (
                        <FemaleIcon className={styles.details__icon} />
                    )}
                    {gender === 'Men' && (
                        <MaleIcon className={styles.details__icon} />
                    )}
                    {gender !== 'Men' && gender !== 'Women' && (
                        <PeopleIcon className={styles.details__icon} />
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
            {cost && cost.sessionPrice !== undefined && (
                <div className={styles.details__item}>
                    <WalletIcon className={styles.details__icon} />
                    <p>
                        Costs <strong>£{cost.sessionPrice.toFixed(2)}</strong>{' '}
                        per session
                    </p>
                </div>
            )}
            {booking && booking.required !== 'Not required' && (
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
                            <Link
                                type="basic"
                                className={styles.googleMapsLink}
                                url={location.googleMapsLink}
                                external
                            >
                                {location.address}
                            </Link>
                        </p>
                    )}
                    {locationURL && (
                        <p>
                            This event&apos;s location changes,{' '}
                            <Link
                                type="basic"
                                url={locationURL}
                                className={styles.googleMapsLink}
                                external
                            >
                                click here for the latest details
                            </Link>
                        </p>
                    )}
                </div>
            </div>
            {link && (
                <div className={styles.details__item}>
                    <LinkIcon className={styles.details__icon} />
                    <Link
                        type="basic"
                        className={styles.externalLink}
                        url={link.url}
                        external
                    >
                        View this events webpage
                    </Link>
                </div>
            )}
        </div>
    );
};

export default EventCard;
