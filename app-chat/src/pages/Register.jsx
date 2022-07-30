import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import Logo from '../assets/logo.svg'
import { registerRoute } from '../utils/APIRoutes';

export function Register() {
    const [ values, setValues ] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()) {
            const { password, confirmPassword, username, email } = values;
            const { data } = await axios.post(registerRoute, {
                username, 
                email, 
                password
            });
        }
    }

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if(password !== confirmPassword) {
            toast.error('A senha e a confirmação de senha deve ser as mesmas!', toastOptions);
            return false;
        }
        else if(username.length < 3 ) {
            toast.error(`O nome de usuário deve ter mais de 3 caracteres`, toastOptions);
            return false;
        }
        else if(password.length < 8 ) {
            toast.error(`A senha deve ser igual ou maior que 8 caracteres`, toastOptions);
            return false;
        }
        else if(email === "") {
            toast.error(`Email é obrigatório`, toastOptions);
            return false;
        }

        return true;
    }

    const handleChage = (event) => {
        setValues({...values, [event.target.name]: event.target.value })
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className='brand'>
                        <img src={Logo} alt='Logo' />
                        <h1>Chat app</h1>
                    </div>
                    <input
                        type="text"
                        placeholder='Username'
                        name='username'
                        onChange={e => handleChage(e)}
                    />
                    <input
                        type="email"
                        placeholder='E-mail'
                        name='email'
                        onChange={e => handleChage(e)}
                    />
                    <input
                        type="password"
                        placeholder='Senha'
                        name='password'
                        onChange={e => handleChage(e)}
                    />
                    <input
                        type="password"
                        placeholder='Confirme sua senha'
                        name='confirmPassword'
                        onChange={e => handleChage(e)}
                    />
                    <button type='submit'>Criar usuário</button>
                    <span>já tem uma conta ? <Link to='/login' >Login</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 5rem;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
        button {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #4e0eff;
            }
        }
        span {
            color: white;
            text-transform: uppercase;
            a {
                color: #4e0eff;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`;