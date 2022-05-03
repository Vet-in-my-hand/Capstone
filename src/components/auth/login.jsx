import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { authService } from "../../firebase";
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Token } from "../../storage/tokenStorage"

function Login() {
    const navigate = useNavigate();

    const [isLogined, setIsLogined] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailChangehandler = (event) => setEmail(event.target.value);
    const passwardChangehandler = (event) => setPassword(event.target.value);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLogined(true);
            } else {
                setIsLogined(false);
            }
        })
    })

    const loginHandler = (event) => {
        event.preventDefault();
        authService.signInWithEmailAndPassword(email,password)
            .then((user) => {
                if (user.user.emailVerified) {
                    const storage = new Token(authService.currentUser.uid)
                    storage.save()
                    navigate("/hellohos");
                } else {
                    alert('이메일 인증이 필요합니다.')
                }
            })
    }

    const onClickRegisterHandeler = () => {
        navigate('/register');
    }

    return (
        <div className='loginWarp'>
            {isLogined ? "로그인" : "안로그인"}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h3">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={loginHandler} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            id="email"
                            name="email"
                            autoComplete="email"
                            variant="standard"
                            autoFocus
                            onChange={emailChangehandler}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            variant="standard"
                            autoComplete="current-password"
                            onChange={passwardChangehandler}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Box>
                            <Button
                                variant='contained'
                                onClick={onClickRegisterHandeler}
                            >
                                회원가입
                            </Button>
                        </Box>


                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default Login;