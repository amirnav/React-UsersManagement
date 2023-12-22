import React, { useContext } from 'react';
import { MainContext } from './contexts/MainContext';
import style from './style.module.css';
import { Nav, NavLink } from 'react-router-dom';


const Sidebar = ()=>{

    const {showMenu,setShowMenu} = useContext(MainContext)

    return (
        <div className={`${style.sidebar_section} bg-secondary`} style={showMenu ? {right:0} : {}}>
            <ul className={`${style.sidebar_list} m-0 p-0`}>
                <li className={style.sidebar_avatar}>
                    <img src="/assets/images/user1.jpg" alt="" />
                </li>
                <li>
                    <NavLink style={({isActive})=>{return isActive?{color:"rgb(109, 142, 212)"}:{}}} to="/user">Users</NavLink>                    
                </li>
                <li>
                    <NavLink style={({isActive})=>{return isActive?{color:"rgb(109, 142, 212)"}:{}}} to="/post">Posts</NavLink>                    
                </li>
                <li>
                    <NavLink style={({isActive})=>{return isActive?{color:"rgb(109, 142, 212)"}:{}}} to="/gallery">Gallery</NavLink>
                </li>
                <li>
                    <NavLink style={({isActive})=>{return isActive?{color:"rgb(109, 142, 212)"}:{}}} to="/todo">Tasks</NavLink>
                </li>
            </ul>
        </div>
    )
}
export default Sidebar;