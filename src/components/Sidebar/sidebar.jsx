import React from 'react';
import './sidebar.css'
import {Link, useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

function SideNav() {
    const navigate = useNavigate();

    const onClickHomeHandler = (e) => {
        e.preventDefault()
        navigate('/');
    }
    const onClickLoginHandler = (e) => {
        e.preventDefault()
        navigate('/login');
    }
    const onClickRegisterHandler = (e) => {
        e.preventDefault()
        navigate('/register');
    }
    return (
        <div className='sidebar'>
            <div className='sidebarWrapper'>
                <div className='sidebarMenu'>
                    <h2 className='sidebarTitle'>Dashboard</h2>
                    <ul className='sidebarList'>
                        <li className='sidebarListItem' onClick={onClickHomeHandler}>
                            <HomeIcon className='sidebarIcon'/>
                            Home
                        </li>
                        <li className='sidebarListItem' onClick={onClickLoginHandler}>
                            <LoginIcon className='sidebarIcon'/>
                            Login
                        </li>
                        <li className='sidebarListItem' onClick={onClickRegisterHandler}>
                            <HowToRegIcon className='sidebarIcon'/>
                            Register
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SideNav;