import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    root: {
        background: '#dedede',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        fontSize: '2rem',
    },
    active: {
        fontSize: '3rem',
    },
    item: {
        width: 56,
        textAlign: 'center',
    },
});

const SlidePicker = ({ value, onChange }) => {
    const classes = useStyles();

    const handleLeft = () => {
        if (value > 1) {
            onChange(value - 1);
        }
    };

    const handleRight = () => {
        if (value < 8) {
            onChange(value + 1);
        }
    };

    return (
        <div className={classes.root}>
            <IconButton aria-label="Left" onClick={handleLeft}>
                <ArrowLeft className={classes.icon} />
            </IconButton>
            <div className={classes.item}>{value > 1 && value - 1}</div>
            <div className={classnames(classes.item, classes.active)}>{value}</div>
            <div className={classes.item}>{value < 8 && value + 1}</div>
            <IconButton aria-label="Right" onClick={handleRight}>
                <ArrowRight className={classes.icon} />
            </IconButton>
        </div>
    );
};


SlidePicker.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SlidePicker;
