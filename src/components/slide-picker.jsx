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
    },
    icon: {
        fontSize: '2rem',
    },
    active: {
        fontSize: '2.875rem',
    },
    container: {
        position: 'relative',
        flex: 1,
    },
    item: {
        transition: '250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        position: 'absolute',
        textAlign: 'center',
        top: '50%',
    },
    visible: {
        opacity: 1,
        display: 'block',
    },
    hidden: {
        opacity: 0,
    },
    gone: {
        display: 'none',
    }
});

const ifIsActive = (offset, className) => offset === 50 ? className : '';
const ifIsHidden = (offset, className) => offset > 80 || offset < 20 ? className : '';
const ifIsGone = (offset, className) => offset > 110 || offset < -10 ? className : '';
const getOffsets = (limit, value) => Array(limit).fill(30).map((offset, index) => offset * (index + 2) - offset * value + 20);

const SlidePicker = ({ value, onChange, limit }) => {
    const classes = useStyles();

    const handleLeft = () => value > 1 && onChange(value - 1);
    const handleRight = () => value < limit && onChange(value + 1);

    return (
        <div className={classes.root}>
            <IconButton aria-label="Left" onClick={handleLeft}>
                <ArrowLeft className={classes.icon} />
            </IconButton>
            <div className={classes.container}>
                {getOffsets(limit, value).map((offset, index) => {
                    const style = { left: `${offset}%`, transform: `translateY(-50%) translateX(-${offset}%)` };

                    const className = classnames(classes.item,
                        ifIsActive(offset, classes.active),
                        ifIsHidden(offset, classes.hidden),
                        ifIsGone(offset, classes.gone),
                    );

                    return <div key={index} className={className} style={style}>{index + 1}</div>;
                })}
            </div>
            <IconButton aria-label="Right" onClick={handleRight}>
                <ArrowRight className={classes.icon} />
            </IconButton>
        </div>
    );
};

SlidePicker.propTypes = {
    limit: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SlidePicker;
