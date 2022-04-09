import { Button, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Container } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// import styles from 'register.module.css';

function Register() {

    const registerHandler = () => {
        
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
                    <Grid container>
                        <Grid itme xs>
                            <TextField
                                margin="normal"
                                label="Email Address"
                                name="email"
                                required
                                fullWidth
                                autoFocus
                                variant="standard"
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                margin="normal"
                                type="submit"
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
                        required
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="normal"
                        label="Confirm Passward"
                        name="confirmPassward"
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
                                required
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid>
                            <Button
                                margin="normal"
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="medium"
                                sx={{ mt: 3 }}
                            >인증</Button>
                        </Grid>

                    </Grid>
                    <Button
                        onClick={registerHandler}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign up
                    </Button>
                </Box>
            </Container>
        </>
    )
}

export default Register;