import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import styles from './styles.module.css';
import { registararion } from '../../services/actions/user';

export const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const user = useSelector((state) => state.userReducer.user);
    const token = useSelector((state) => state.userReducer.token);
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(registararion(email, password, name));
      };
   
    return (
        (user && token) ? <Navigate to='/' /> :
        <article className={styles.main}>
            <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
            <form className={styles.form} onSubmit={onSubmit}>
                <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => setName(e.target.value)}
                value={name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
                />
                <EmailInput
                onChange={e => setEmail(e.target.value)}
                value={email}
                name={'email'}
                isIcon={false}
                extraClass="mb-6"
                />
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    extraClass="mb-6"
                />
                <Button
                type="primary"
                size="medium"
                htmlType="submit"
                aria-label="Зарегистрироваться"
                data-at-selector="login-button"
                extraClass="mb-20"
                >
                Зарегистрироваться
                </Button>
            </form>
            <p className="text text_type_main-default text_color_inactive">
                {"Уже зарегистрированы? "}
                <Link className={styles.link} to="/login">
                Войти
                </Link>
            </p>
                
        </article>
    );
}
