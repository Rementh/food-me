import React from 'react';

const defaultStyle = {
    height: 18,
    background: '#eee',
    borderRadius: 18,
    margin: '16px 0'
};

const getRandomWidth = (min, max) => min + Math.floor(Math.random() * (max - min));

const Mock = () => <div style={{
    width: getRandomWidth(100, 150),
    ...defaultStyle
}}></div>;

export default Mock;
