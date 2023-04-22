import React, { FormEvent, FC } from 'react';
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import { useState } from 'react';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import styles from './styles.module.css';
import { resetPassword } from '../../services/actions/user';

export const ResetPasswordPage: FC = () => {
    const [code, setCode] = useState("");
    const [password, setPassword] = useState('');
    const isPasswordForgot = useSelector((state) => state.userReducer.isPasswordForgot);
    const dispatch = useDispatch();
    
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(resetPassword(password, code));
      }; 
  
    return (
        (!isPasswordForgot) ? <Navigate to='/forgot-password' /> :
        <article className={styles.main}>
            <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
            <form className={styles.form} onSubmit={onSubmit}>
                <PasswordInput
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    extraClass="mb-6"
                    placeholder="Введите новый пароль"
                />
                 <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                    name={'code'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                    />
                <Button
                type="primary"
                size="medium"
                htmlType="submit"
                aria-label="Войти"
                data-at-selector="login-button"
                extraClass="mb-20"
                >
                Сохранить
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
