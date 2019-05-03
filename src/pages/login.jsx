import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import firebase from '../firebase';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const styles = {
    paper: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        margin: 20
    },
    formControl: {
        marginBottom: 20
    },
    header: {
        textAlign: 'center',
        marginTop: 0
    }
};

const Login = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogging, setIsLogging] = useState(false);

    return (
        <form onSubmit={handleOnLogin}>
            <Paper style={styles.paper}>
                <h2 style={styles.header}>Login</h2>
                <Input style={styles.formControl} placeholder="Email" value={email}
                    onChange={e => setEmail(e.target.value)} />
                <Input style={styles.formControl} placeholder="Password" type="password" value={password}
                    onChange={e => setPassword(e.target.value)} />
                <Button style={styles.formControl} disabled={isLogging} variant="contained" color="primary" type="submit">
                    Login
                </Button>
                <Link component={RouterLink} to="/register">Need an account?</Link>
            </Paper>
        </form>
    );

    async function handleOnLogin(e) {
        e.preventDefault();
        setIsLogging(true);

        try {
            await firebase.login(email, password);
            history.push('/');
        } catch (error) {
            setIsLogging(false);
            alert(error);
        }
    }
};

Login.propTypes = { history: PropTypes.object.isRequired };

export default withRouter(Login);
