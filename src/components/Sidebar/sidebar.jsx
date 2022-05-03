import React from "react"
import { Link, useNavigate } from "react-router-dom";
import SidebarItem from "./sidebaritems";
import styles from "./sidebar.module.css";
import { Token } from "../../storage/tokenStorage"

function Sidebar() {
    const storage = new Token()
    const navigate = useNavigate();

    const menus = [
        {
            name: '첫번째 화면',
            path: '/'
        }, 
        {
            name: '로그인 화면',
            path: '/login'
        }, 
        {
            name: '회원가입',
            path: '/register'
        }
    ]

    const onClickLogoutHandler = (e) => {
        e.preventDefault()
        storage.clear()
        navigate('/login')
    }
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarHosName}>
                병원 이름
            </div>
            {
                menus.map((menu, index) => {
                    return (
                        <Link className={styles.sidebarMenu} to={menu.path} key={index}>
                            <SidebarItem menu={menu}/>
                        </Link>
                    );
                })
            }
            <div className={styles.logoutBtn} onClick={onClickLogoutHandler}>
                로그아웃
            </div>
        </div>
    );
}
export default Sidebar;