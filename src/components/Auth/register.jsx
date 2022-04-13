import { Button, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Container } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';

// import styles from 'register.module.css';

function Register() {

    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   


    const emailChangehandler =(event) => {
        setEmail(event.target.value);
    }

    const passwardChangehandler =(event) => {
        setPassword(event.target.value);
    }

    const registerHandler = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
    }
    return (
        <>
            <Container component="main" maxWidth="xs">

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h3">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                    <Grid container>
                        <Grid itme xs>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                id="email"
                                variant="standard"
                                autoFocus
                                onChange={emailChangehandler}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                margin="normal"
                                type="button"
                                fullWidth
                                variant="contained"
                                size="medium"
                                sx={{ mt: 3 }}
                            >인증</Button>
                        </Grid>
                    </Grid>
                    <TextField
                        margin="normal"
                        label="Passward"
                        name="passward"
                        id="passward"
                        type="password"
                        required
                        fullWidth
                        onChange={passwardChangehandler}
                        variant="standard"
                    />
                    <TextField
                        margin="normal"
                        label="Confirm Passward"
                        name="confirmPassward"
                        id="confirmPassward"
                        type="password"
                        required
                        fullWidth
                        variant="standard"
                    />
                    <Grid container>
                        <Grid item xs>
                            <TextField
                                margin="normal"
                                label="사업자번호"
                                name="businesNumber"
                                id="businesNumber"
                                required
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid>
                            <Button
                                margin="normal"
                                type="button"
                                fullWidth
                                variant="contained"
                                size="medium"
                                sx={{ mt: 3 }}
                            >인증</Button>
                        </Grid>

                    </Grid>
                    <Button
                        onClick={registerHandler}
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign up
                    </Button>
                </Box>
                </Box>
            </Container>
        </>
    )
}

export default Register;