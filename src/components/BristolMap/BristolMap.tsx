'use client';

import React from 'react';
import type { Event } from '@/types/types';

// eslint-disable-next-line import/no-extraneous-dependencies
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Link from 'next/link';
import { rubik } from '@/pages/_app';
import styles from './BristolMap.module.scss';
import { ExternalIcon } from '../Icons/ExternalIcon';

type MapProps = {
    events: Event[];
};

const BristolMap = ({ events }: MapProps) => {
    return (
        <div className={styles.container}>
            <MapContainer
                center={[51.456098, -2.596541]}
                zoom={13}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {events.map((event, index) => (
                    <Marker
                        key={index}
                        position={[
                            parseFloat(event.location.latitude),
                            parseFloat(event.location.longitude),
                        ]}
                    >
                        <Popup className={rubik.className}>
                            <p className={styles.popupTitle}>
                                <Link href={`/events/${event.slug}`}>
                                    {event.name}
                                </Link>
                            </p>
                            <p className={styles.popupText}>
                                {event.location.address}
                            </p>
                            <a
                                className={styles.eventLink}
                                href={event.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                View event host&apos;s website <ExternalIcon />
                            </a>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default BristolMap;
