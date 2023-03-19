import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, EmailInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useNavigate } from "react-router-dom";
import styles from './styles.module.css';
import { patchUsersData } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie'

export const ProfilePage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState("");
    const [isInfoChanged, setIsInfoChanged] = useState(false);
    const user = useSelector((state) => state.userReducer.user);

    const dispatch = useDispatch();
    const accessToken = getCookie("accessToken");

    const onNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        value === user.name ? setIsInfoChanged(false) : setIsInfoChanged(true);
      }
    
      const onEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        value === user.email ? setIsInfoChanged(false) : setIsInfoChanged(true);
      }
    
      const onPasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        value === password ? setIsInfoChanged(false) : setIsInfoChanged(true);
      }


    const cancel = (e) => {
        e.preventDefault();
        setName(user.name)
        setEmail(user.email)
        setPassword('')
      }

    const onSubmit = (e) => {
    e.preventDefault();
    dispatch(patchUsersData(accessToken, name, email, password));
    }; 

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPassword('');
        } 
      }, [user]);
    
     

    return (
        <article className={styles.main}>
            <nav className={styles.navigation}>
                <ul className={styles.list}>
                    <li className={styles.nav_item}>
                        <NavLink
                    
                        className={`${styles.link} ${styles.link_active} text text_type_main-medium`}
                        
                        >
                        Профиль
                        </NavLink>
                    </li>
                    <li className={styles.nav_item}>
                        <NavLink
                        className={`${styles.link} text text_type_main-medium`} 
                        >
                        История заказов
                        </NavLink>
                    </li>
                    <li className={styles.nav_item}>
                        <NavLink
                        className={`${styles.link} text text_type_main-medium`}
                    
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
            <form className={styles.form} onSubmit={onSubmit}>
                <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onNameChange}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
                icon={'EditIcon'}
                value={name}
                />
                <EmailInput
                placeholder={'Логин'}
                onChange={onEmailChange}
                name={'email'}
                extraClass="mb-6"
                icon={'EditIcon'}
                value={email}
                />
                <Input
                type={'password'}
                placeholder={'Пароль'}
                    name={'password'}
                    extraClass="mb-6"
                    icon={'EditIcon'}
                    value={password}
                    onChange={onPasswordChange}
                />
                {isInfoChanged && (
                <div>
                
                <Button
                type="primary"
                size="medium"
                htmlType="submit"
                aria-label="Войти"
                data-at-selector="login-button"
                extraClass="mb-20 mr-5"
                >
                Сохранить
                </Button>
                <Button
                type="primary"
                size="medium"
                aria-label="Отмена"
                data-at-selector="login-button"
                extraClass="mb-20"
                htmlType="button"
                onClick={cancel}
                
                >
                Отмена
                </Button>
                </div>
)}
            </form>
            
        </article>
    );
}
