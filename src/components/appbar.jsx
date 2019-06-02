import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Slide from '@material-ui/core/Slide';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase';

const HideOnScroll = ({ children }) => {
    const trigger = useScrollTrigger();
    return (
        <Slide in={!trigger}>
            {children}
        </Slide>
    );
};

HideOnScroll.propTypes = { children: PropTypes.node.isRequired };

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const PrimarySearchAppBar = ({ history }) => {
    const classes = useStyles();
    const [anchorProfileEl, setAnchorProfileEl] = useState(null);
    const [anchorMenuEl, setAnchorMenuEl] = useState(null);

    const isProfileOpen = Boolean(anchorProfileEl);
    const isMenuOpen = Boolean(anchorMenuEl);

    const handleProfileOpen = event => setAnchorProfileEl(event.currentTarget);
    const handleProfileClose = () => setAnchorProfileEl(null);

    const handleMenuOpen = event => setAnchorMenuEl(event.currentTarget);
    const handleMenuClose = () => setAnchorMenuEl(null);

    const handleOnLogout = async e => {
        e.preventDefault();
        await firebase.logout();
        history.push('/login');
    };

    const handleOnNewRecipe = e => {
        e.preventDefault();
        history.push('/newrecipe');
    };

    const renderProfile = (
        <Menu
            anchorEl={anchorProfileEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isProfileOpen}
            onClose={handleProfileClose}
        >
            <MenuItem onClick={handleOnLogout}>Wyloguj</MenuItem>
        </Menu>
    );

    const renderMenu = (
        <Menu
            anchorEl={anchorMenuEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleOnNewRecipe}>Dodaj przepis</MenuItem>
        </Menu>
    );

    return (
        <>
            <HideOnScroll>
                <AppBar>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleMenuOpen} className={classes.menuButton}>
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Przepisy
                        </Typography>
                        <IconButton edge="end" color="inherit" onClick={handleProfileOpen}>
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
            {renderProfile}
            {renderMenu}
        </>
    );
};

PrimarySearchAppBar.propTypes = { history: PropTypes.object.isRequired };

export default withRouter(PrimarySearchAppBar);
