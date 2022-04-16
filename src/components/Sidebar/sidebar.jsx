import React from "react"
// import styled from "styled-components";
import {Link} from "react-router-dom";
import SidebarItem from "./sidebaritems";
import "./sidebarcss.css"

function Sidebar() {
    const menus = [
        {
            name: '첫번째 화면',
            path: '/'
        }, {
            name: '로그인 화면',
            path: '/login'
        }, {
            name: '회원가입',
            path: '/register'
        }

    ]
    return (
        <div className="sidebar">
            {
                menus.map((menu, index) => {
                    return (
                        <Link className="sidebarMenu" to={menu.path} key={index}>
                            <SidebarItem menu={menu}/>
                        </Link>
                    );
                })
            }
        </div>
    );
}
export default Sidebar;