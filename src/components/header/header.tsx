import React from 'react';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyles from './header.module.css';

import { NavLink } from 'react-router-dom';


export const AppHeader = () => {

    return (
        <header className={headerStyles.header}>
            <nav>
                <ul className={headerStyles.list}>
                    <li className="pl-5 pr-5">
                        <NavLink className={({isActive}) => isActive ? `${headerStyles.link_active}` : `${headerStyles.link}` } to="/">
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default ml-2">Конструктор</p>
                        </NavLink>
                    </li>
                    <li className='ml-2 pl-5' >
                        <NavLink className={({isActive}) => isActive ? `${headerStyles.link_active}` : `${headerStyles.link}` } to="/feed">
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default ml-2 ">Лента заказов</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className={headerStyles.logo__wrapper}><Logo/></div>
            
            <NavLink className={({isActive}) => isActive ? `${headerStyles.link_active}` : `${headerStyles.link}` } 
                to="/profile">
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default ml-2">Личный кабинет</p>
            </NavLink>
        </header>
    );
}
