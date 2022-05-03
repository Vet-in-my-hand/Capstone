import React from 'react';
import './sidebar.css'
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { authService } from '../../firebase';

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

    const onClickSettingHandler = (e)=>{
        e.preventDefault()
        navigate('/infoHos');
    }
    const onClickLogoutHandler = (e) => {
        e.preventDefault()
        authService.signOut().then(() => {
            localStorage.clear();
            navigate('/login');
        })
    }
    return (
        <div className='sidebar'>
            <div className='sidebarWrapper'>
                <div className='sidebarMenu'>
                    <h2 className='sidebarTitle'>Dashboard</h2>
                    <ul className='sidebarList'>
                        <li className='sidebarListItem' onClick={onClickHomeHandler}>
                            <HomeIcon className='sidebarIcon' />
                            Home
                        </li>

                        {
                            localStorage.getItem('userToken') ?
                            <>
                                <li className='sidebarListItem' onClick={onClickLogoutHandler}>
                                    <HowToRegIcon className='sidebarIcon' />
                                    logout
                                </li>
                                <li className='sidebarListItem' onClick={onClickSettingHandler}>
                                    <HowToRegIcon className='sidebarIcon' />
                                    setting
                                </li>
                                </>
                                 : <li className='sidebarListItem' onClick={onClickLoginHandler}>
                                    <LoginIcon className='sidebarIcon' />
                                    Login
                                </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SideNav;