import { FormEvent } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import styles from './styles.module.css';
import { login } from '../../services/actions/user';

export const LoginPage = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const user = useSelector((state: any) => state.userReducer.user);
    const token = useSelector((state: any) => state.userReducer.token);
    
    const dispatch = useDispatch();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch<any>(login(email, password));
      }; 

    return (
        (user && token) ? <Navigate to='/' /> :
        <article className={styles.main}>
            <h2 className="text text_type_main-medium mb-6">Вход</h2>
            <form className={styles.form} onSubmit={onSubmit}>
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
                aria-label="Войти"
                data-at-selector="login-button"
                extraClass="mb-20"
                >
                Войти
                </Button>
            </form>
            <p className="text text_type_main-default text_color_inactive">
                    {"Вы — новый пользователь? "}
                    <Link className={styles.link} to="/register">
                    Зарегистрироваться
                    </Link>
                </p>
                <p className="text text_type_main-default text_color_inactive mt-4">
                    {"Забыли пароль? "}
                    <Link className={styles.link} to="/forgot-password">
                    Восстановить пароль
                    </Link>
                </p>
        </article>
    );
}
