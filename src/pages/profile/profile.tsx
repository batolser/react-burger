import React, { ChangeEvent, FormEvent  } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import { Button, EmailInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, Route, Routes, useLocation } from "react-router-dom";
// import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import styles from './styles.module.css';
import { patchUsersData, logout } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie'
import { ProfileForm } from './profile-form'
import {ProfileFeedPage} from '../profile-feed/profile-feed'

export const ProfilePage = () => {
   
    const dispatch = useDispatch();
    // let background = location.state && location.state.background;


    const setLogout = () => {
        const refreshToken = getCookie("refreshToken");
        if (refreshToken){
        dispatch(logout(refreshToken));
        console.log("прошло")
        }
      }
    
     

    return (
        <article className={styles.main}>
            <nav className={styles.navigation}>
                <ul className={styles.list}>
                    <li className={styles.nav_item}>
                        <NavLink
                    
                    className={({isActive}) => isActive ? `${styles.link_active}` : `${styles.link}` }
                    to='/profile'
                 
                        >
                        Профиль
                        </NavLink>
                    </li>
                    <li className={styles.nav_item}>
                        <NavLink
                        className={({isActive}) => isActive ? `${styles.link_active}` : `${styles.link}` }
                        to='/profile/orders'
                        >
                        История заказов
                        </NavLink>
                    </li>
                    <li className={styles.nav_item}>
                        <NavLink
                        className={`${styles.link} text text_type_main-medium`}
                        onClick={setLogout} 
                        to='/'
                        >
                        Выход
                        </NavLink>
                    </li>
                </ul>
                <p
                className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}
                >
                В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
           
             <ProfileForm />
               
            
        </article>
    );
}
