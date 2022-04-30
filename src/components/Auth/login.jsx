import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { authService } from "../../firebase";
import {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom"

function Login() {
   const [isLogined, setIsLogined] = useState(false);
   const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const emailChangehandler = (event) => setEmail(event.target.value);
    const passwardChangehandler = (event) => setPassword(event.target.value);

   useEffect(()=>{
       authService.onAuthStateChanged((user) => {
           if(user){
               setIsLogined(true);
           }else{
               setIsLogined(false);
           }
       })
   })
   
   const loginHandler = (event) => {
        event.preventDefault();
        authService.signInWithEmailAndPassword(email,password)
        .then((user) => {
            if(user.user.emailVerified){
                console.log('이메일 인증되있음.')
                navigate("/hellohos");
            }else{
                alert('이메일 인증이 필요합니다.')
            }
            // const user = authService.currentUser;
            
            // console.log(user);
        })
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

                        {/* <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid> */}
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
            </div>
        
    );
}

export default Login;