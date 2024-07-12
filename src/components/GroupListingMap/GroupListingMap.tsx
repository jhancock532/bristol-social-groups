import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ExpandIcon } from '@/components/Icons/ExpandIcon';
import { Group } from '@/types/Group';
import styles from './GroupListingMap.module.scss';

const Map = dynamic(() => import('@/components/Map'), {
    ssr: false,
});

type GroupListingMapProps = {
    groups: Group[];
};

/**
 * Renders a map of group listings within a dropdown accordion
 *
 * @param {Group[]} props.groups - An array of group objects to display
 * @returns {JSX.Element} A map of the groups in Bristol
 */
const GroupListingMap = ({ groups }: GroupListingMapProps) => {
    const [mapIsOpen, setMapIsOpen] = useState(false);

    let toggleButtonStyles = `${styles.toggleButton} `;

    if (mapIsOpen) toggleButtonStyles += styles.toggleButtonOpen;

    if (groups.length !== 0) {
        return (
            <div className={styles.container}>
                <button
                    className={toggleButtonStyles}
                    onClick={() => setMapIsOpen(!mapIsOpen)}
                >
                    <span className={styles.buttonText}>
                        {mapIsOpen ? 'Hide map' : 'View map'}
                        <ExpandIcon
                            className={styles.dropdownIcon}
                            pointDownwards={!mapIsOpen}
                        />
                    </span>
                </button>

                {mapIsOpen && <Map groups={groups} />}
            </div>
        );
    }

    return null;
};

export default GroupListingMap;
