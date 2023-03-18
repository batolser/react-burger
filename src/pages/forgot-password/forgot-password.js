import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import styles from './styles.module.css';
import { forgotPassword } from '../../services/actions/user';

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState(''); 
    const dispatch = useDispatch();
    const isPasswordForgot = useSelector((state) => state.userReducer.isPasswordForgot);
    
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
      }; 

    return (
        (isPasswordForgot) ? <Navigate to='/reset-password' /> :
        <article className={styles.main}>
            <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
            <form className={styles.form}  onSubmit={onSubmit}>
                <EmailInput
                onChange={e => setEmail(e.target.value)}
                value={email}
                name={'email'}
                isIcon={false}
                extraClass="mb-6"
                placeholder="Укажите e-mail"
                />
                <Button
                type="primary"
                size="medium"
                htmlType="submit"
                aria-label="Войти"
                data-at-selector="login-button"
                extraClass="mb-20"
                >
                Восстановить
                </Button>
            </form>
            <p className="text text_type_main-default text_color_inactive">
                {"Вспомнили пароль? "}
                <Link className={styles.link} to="/login">
                Войти
                </Link>
            </p>
        </article>
    );
}
