import { Button, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Container } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
// import { width } from "@mui/system";
// import Postcode from "./postcode";
// import styles from './register.module.css'


function Register() {
    const postcodeStyle = {
        display: "block",
        position: "absolute",
        top: "10%",
        width: "600px",
        height: "600px",
        padding: "7px",
    }

    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [fullAddress, setFullAddress] = useState('');
    const [extraAddress, setExtraAddress] = useState('');
    const [zonecode, setZonecode] = useState('');

    const [open, SetOpen] = useState(false);
    const handleOpen = () => {
        SetOpen(true);
        console.log(open)
    };
    const handleClose = () => {
        SetOpen(false);
        console.log(open);
    }
    const test1 = () => {
        console.log(fullAddress);
        console.log(zonecode);
    }

    const Postcode = (props) => {
        const handleComplete = (data) => {
            console.log('열림');
            let fullAddress = data.address;
            let zonecode = data.zonecode;
            let extraAddress = '';

            setFullAddress(fullAddress);
            setZonecode(zonecode);

            if (data.addressType === 'R') {
                if (data.bname !== '') {
                    extraAddress += data.bname;
                }
                if (data.buildingName !== '') {
                    extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
                }
                fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
            }
            console.log(data);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
            console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
            console.log(data.zonecode);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'

            props.onClose()
        }
        return (
            <div>
                <DaumPostcode
                    onComplete={handleComplete}
                    style={postcodeStyle} />
                <button type='button'
                    onClick={() => { props.onClose() }} className='postCode_btn'>닫기</button>
            </div>
        );

    }


    const emailChangehandler = (event) => {
        setEmail(event.target.value);
    }

    const passwardChangehandler = (event) => {
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
        <div className="registerWarp">
            <Container component="main" maxWidth="xs">

                <Box
                    sx={{
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
                        <TextField
                            margin="normal"
                            label="병원이름"
                            name="hospitalName"
                            id="hospitalName"
                            fullWidth
                            variant="standard"
                            required

                        />

                        <TextField
                            margin="normal"
                            label="전화번호"
                            name="hospitalPhoneNumber"
                            id="hospitalPhoneNumber"
                            fullWidth
                            variant="standard"
                            required

                        />
                        <Grid container>
                            <Grid item xs>
                                <TextField
                                    margin="normal"
                                    label="우편번호"
                                    defaultValue={zonecode}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                >


                                </TextField>

                            </Grid>
                            <Grid>
                                <Button
                                    onClick={handleOpen}>
                                    우편번호 검색
                                </Button>
                                <div>
                                    {open && (
                                        <Postcode
                                            // onComplete={handleComplete}
                                            onClose={handleClose}
                                            // setFullAddress={fullAddress}
                                            // setZonecode={zonecode}

                                            style={postcodeStyle}
                                        />
                                    )}

                                </div>


                            </Grid>

                        </Grid>
                        <Button
                            onClick={test1}>
                            bubu
                        </Button>
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
        </div>
    )
}

export default Register;