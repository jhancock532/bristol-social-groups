'use client';

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from './Map.module.scss';

type MapProps = {
    longitude: number;
    latitude: number;
    address: string;
};

const Map = ({ longitude, latitude, address }: MapProps) => {
    return (
        <div className={styles.container}>
            <MapContainer
                center={[latitude, longitude]}
                zoom={15}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latitude, longitude]}>
                    <Popup>{address}</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map;
