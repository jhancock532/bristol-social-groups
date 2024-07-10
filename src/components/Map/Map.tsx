'use client';

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Link from 'next/link';
import { rubik } from '@/pages/_app';
import { ExternalIcon } from '../Icons/ExternalIcon';
import styles from './Map.module.scss';

type MapProps = {
    groups: any[];
};

const Map = ({ groups }: MapProps) => {
    const events = [];

    for (let i = 0; i < groups.length; i += 1) {
        for (let j = 0; j < groups[i].events.length; j += 1) {
            let event;

            event = groups[i].events[j];
            event.slug = groups[i].slug;
            event.name = groups[i].name;

            if (groups[i].events[j].location) {
                events.push(event);
            }
        }
    }

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
                                View group&apos;s website <ExternalIcon />
                            </a>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;
