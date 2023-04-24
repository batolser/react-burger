import React, { ChangeEvent, FormEvent  } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import { Button, EmailInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useNavigate } from "react-router-dom";
import styles from './styles.module.css';
import { patchUsersData, logout } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie'

export const ProfileForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState("");
    const [isInfoChanged, setIsInfoChanged] = useState(false);
    const user = useSelector((state) => state.userReducer.user);

    const dispatch = useDispatch();
    const accessToken = getCookie("accessToken");

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        value === user!.name ? setIsInfoChanged(false) : setIsInfoChanged(true);
      }
    
      const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        value === user!.email ? setIsInfoChanged(false) : setIsInfoChanged(true);
      }
    
      const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        value === password ? setIsInfoChanged(false) : setIsInfoChanged(true);
      }


    const cancel = () => {
   
        setName(user!.name)
        setEmail(user!.email)
        setPassword('')
      }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (accessToken){
        dispatch(patchUsersData(accessToken, name, email, password));
    }
    
    }; 

     

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPassword('');
        } 
      }, [user, setName, setEmail, setPassword]);
    
     

    return (
     
         <> 
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
                <Input
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
            </>     
    
    );
}
