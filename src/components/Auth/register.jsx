import { Button, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Container } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';
import styles from './register.module.css'
import { authService } from "../../firebase";
import { newHospitalInit } from "../../service/authService";
import { useNavigate } from "react-router-dom"
import axios from "axios";

function Register() {
    const url = [
        'http://openapi.seoul.go.kr:8088/636272715a706a6836387649795744/json/LOCALDATA_020301/1/1000/',
        'http://openapi.seoul.go.kr:8088/636272715a706a6836387649795744/json/LOCALDATA_020301/1001/2000/',
        'http://openapi.seoul.go.kr:8088/636272715a706a6836387649795744/json/LOCALDATA_020301/2001/3000/',
    ]

    const postcodeStyle = {
        display: "block",
        position: "absolute",
        left: "35%",
        top: "10%",
        width: "600px",
        height: "600px",
        border: "1px solid black"
    }

    const businesData = [];

    const [businesFlag, setBusinesFlag] = useState(false);
    const [tset22, setTset22] = useState([]);

    useEffect(() => {
        axios
            .all([axios.get(url[0]), axios.get(url[1]), axios.get(url[2])])
            .then(
                axios.spread((res1, res2, res3) => {
                    const temp = res1.data.LOCALDATA_020301.row;
                    const temp2 = res2.data.LOCALDATA_020301.row;
                    const temp3 = res3.data.LOCALDATA_020301.row;
                    console.log(temp[0].MGTNO)
                    businesData.push(Object.values(temp));
                    setTset22(Object.values(temp));
                })
            )
    }, [])

    const [test33, setTest33] = useState({});

    const getBusinesNumber = () => {
        console.log(tset22)
        tset22.forEach(e => {
            if (e.MGTNO === businesNumber) {
                setTest33({ MGTNO: e.MGTNO, BPLCNM: e.BPLCNM, TRDSTATEGBN: e.TRDSTATEGBN });
            }
        });
        // const data = result1.filter(e=>e.MGTNO===businesNumber);
        console.log(businesFlag);
        console.log('tset33', test33);
    }

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassward, setConfirmPassward] = useState('');
    const [businesNumber, setBusinesNumber] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [hospitalTel, setHospitalTel] = useState('');
    const [hospitalUid, setHospitalUid] = useState('');

    const emailChangehandler = (event) => setEmail(event.target.value);
    const passwardChangehandler = (event) => setPassword(event.target.value);
    const confirmPasswardChangehandler = (event) => setConfirmPassward(event.target.value);
    const businesNumberChangehandler = (event) => setBusinesNumber(event.target.value);


    const hospitalNameChangehandler = (event) => setHospitalName(event.target.value);
    const hospitalTelChangehandler = (event) => setHospitalTel(event.target.value);

    const registerHandler = (event) => {
        event.preventDefault();
        if (password !== confirmPassward) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
        }
        authService.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setHospitalUid(user.uid);
                console.log(user.uid);
                newHospitalInit(hospitalName, hospitalTel, fullAddress, extraAddress, user.uid);
            })
            .then(() => {
                const user = authService.currentUser;

                user.sendEmailVerification()
                    .then(() => {
                        alert('작성한 이메일로 인증을 보냅니다.\n인증하지않고 로그인을 시도할경우, 회원정보는 사라집니다.');
                        console.log(user.emailVerified);
                    })
                    .catch('Email not sent!');
                    
                authService.signOut().then(()=>{
                    navigate("/login");
                })    
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                console.log(errorCode);
                console.log(errorMessage);
            })

    }

    const [open, SetOpen] = useState(false);

    const handleOpen = () => SetOpen(true);
    const handleClose = () => SetOpen(false);

    const [fullAddress, setFullAddress] = useState('');
    const [extraAddress, setExtraAddress] = useState('');
    const [zonecode, setZonecode] = useState('');

    const extraAddressChangehandler = (event) => setExtraAddress(event.target.value);

    const Postcode = (props) => {
        const handleComplete = (data) => {
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
                    onClick={() => { props.onClose() }} className={styles.postCode_btn}>닫기</button>
            </div>
        );
    }

    return (
        <div className={styles.registerWarp}>
            <Container component="main" maxWidth="xs">

                <Box
                    sx={{
                        // marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h3">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={registerHandler} sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="email"
                            label="Email Address"
                            name="email"
                            id="email"
                            variant="standard"
                            autoFocus
                            onChange={emailChangehandler}
                        />
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
                            label="ConfirmPassward"
                            name="confirmPassward"
                            id="confirmPassward"
                            type="password"
                            required
                            fullWidth
                            onChange={confirmPasswardChangehandler}
                            variant="standard"
                        />
                        {/* <Grid container>
                            <Grid item xs>
                                <TextField
                                    margin="normal"
                                    label="사업자번호"
                                    name="businesNumber"
                                    id="businesNumber"
                                    required
                                    fullWidth
                                    onChange={businesNumberChangehandler}
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
                                    onClick={getBusinesNumber}
                                    sx={{ mt: 3 }}
                                >인증</Button>
                            </Grid>

                        </Grid> */}
                        <TextField
                            margin="normal"
                            label="병원이름"
                            name="hospitalName"
                            id="hospitalName"
                            fullWidth
                            required
                            onChange={hospitalNameChangehandler}
                            variant="standard"
                        />

                        <TextField
                            margin="normal"
                            label="전화번호"
                            name="hospitalPhoneNumber"
                            id="hospitalPhoneNumber"
                            fullWidth
                            required
                            onChange={hospitalTelChangehandler}
                            variant="standard"
                        />
                        <Grid container>
                            <Grid item xs>
                                <TextField
                                    margin="normal"
                                    label="주소"
                                    value={fullAddress}
                                    fullWidth
                                    required
                                    variant="standard"
                                />
                            </Grid>
                            <Grid>
                                <Button
                                    margin="normal"
                                    type="button"
                                    onClick={handleOpen}
                                    fullWidth
                                    variant="contained"
                                    size="medium"
                                    sx={{ mt: 3 }}
                                >주소검색</Button>
                            </Grid>
                        </Grid>


                        <Grid container>
                            <Grid item xs={10}>
                                <TextField
                                    margin="normal"
                                    label="나머지 주소입력"
                                    fullWidth
                                    variant="standard"
                                    onChange={extraAddressChangehandler}
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    margin="normal"
                                    label="우편번호"
                                    value={zonecode}
                                    fullWidth
                                    variant="standard"
                                >

                                </TextField>

                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign up
                        </Button>
                    </Box>
                </Box>
            </Container>
            <div>
                {open && (
                    <Postcode
                        onClose={handleClose}
                        style={postcodeStyle}
                    />
                )}
            </div>
        </div>
    )
}

export default Register;