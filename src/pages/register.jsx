import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import firebase from '../firebase';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const styles = {
    paper: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        margin: 20
    },
    input: {
        marginBottom: 20
    },
    header: {
        textAlign: 'center',
        marginTop: 0
    }
};

const Register = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <form onSubmit={handleOnRegister}>
            <Paper style={styles.paper}>
                <h2 style={styles.header}>Register</h2>
                <Input style={styles.input} placeholder="Name" value={name}
                    onChange={e => setName(e.target.value)} />
                <Input style={styles.input} placeholder="Email" value={email}
                    onChange={e => setEmail(e.target.value)} />
                <Input style={styles.input} placeholder="Password" type="password" value={password}
                    onChange={e => setPassword(e.target.value)} />
                <Button disabled={isRegistering} variant="contained" color="primary" type="submit">Register</Button>
            </Paper>
        </form>
    );

    async function handleOnRegister(e) {
        e.preventDefault();
        setIsRegistering(true);

        try {
            await firebase.register(name, email, password);
            history.push('/');
        } catch (error) {
            setIsRegistering(false);
            alert(error);
        }
    }
};

Register.propTypes = { history: PropTypes.object.isRequired };

export default withRouter(Register);
