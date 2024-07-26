import React from 'react';

const styles = {
    heading: {
        color: '#1c221d',
    },
    colorGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '20px',
    },
    colorSwatch: {
        padding: '20px',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: '5px',
    },
    colorInfo: {
        fontSize: '14px',
    },
    colorName: {
        fontWeight: 'bold',
    },
    colorValue: {
        fontFamily: 'monospace',
    },
};

const ColorSwatch = ({
    name,
    value,
    isLight,
}: {
    name: string;
    value: string;
    isLight?: boolean;
}) => (
    <div
        style={{
            ...styles.colorSwatch,
            backgroundColor: value,
            color: isLight ? '#1c221d' : '#fff',
        }}
    >
        <div style={styles.colorInfo}>
            <span style={styles.colorName}>{name}</span>
            <br />
            <span style={styles.colorValue}>{value}</span>
        </div>
    </div>
);

const ColorDocumentation = () => {
    const baseColors = [
        { name: 'Bright White', value: '#fff', isLight: true },
        { name: 'White', value: '#f7fff8', isLight: true },
        { name: 'Dark Green', value: '#1a6201' },
        { name: 'Underline Green', value: '#65c783' },
        { name: 'Highlight Green', value: '#8beba8', isLight: true },
        { name: 'Disabled Green', value: '#c4f0c4', isLight: true },
        { name: 'Dark Gray', value: '#363635' },
        { name: 'Green', value: '#558564' },
        { name: 'Midnight', value: '#1c221d' },
        { name: 'Black', value: '#121613' },
    ];

    const themeColors = [
        { name: 'Primary', value: '#1a6201' },
        { name: 'Text', value: '#1c221d' },
        { name: 'Link', value: '#1a6201' },
        { name: 'Underline', value: '#65c783' },
        { name: 'Background', value: '#f7fff8', isLight: true },
    ];

    return (
        <div>
            <h2 style={styles.heading}>Base Colors</h2>
            <div style={styles.colorGrid}>
                {baseColors.map((color, index) => (
                    <ColorSwatch key={index} {...color} />
                ))}
            </div>

            <h2 style={styles.heading}>Theme Colors</h2>
            <div style={styles.colorGrid}>
                {themeColors.map((color, index) => (
                    <ColorSwatch key={index} {...color} />
                ))}
            </div>
        </div>
    );
};

export default ColorDocumentation;
