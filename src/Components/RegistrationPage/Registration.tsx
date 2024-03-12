import { Box, Button, TextField, Typography } from "@mui/material"
import { About } from "./About"
import { HeaderLogin } from "./HeaderLogin"
import { Welcome } from "./Welcome"
import { fetchAuth, fetchRegister} from "../../store/auth"
import { useAppDispatch } from "../../store/hooks"
import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../store"
import React, { Dispatch, FC, SetStateAction } from "react"


export const Authorize = () => {

    const [authMode, setAuthMode] = React.useState('login');
    console.log(authMode)
    const isAuth = useAppSelector((state) => state.authData.data);
    console.log(isAuth);


    if (isAuth) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="registrationWrapper">
            <HeaderLogin />
            <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                <Box width={'50%'} bgcolor={'white'} borderRadius={'6px'} border={'solid 2px #9095f7'} padding={'12px'}>

                    {authMode == 'register' && <Registration onClick={()=> setAuthMode('login')}/>}
                    {authMode == 'login' && <Login onClick={()=> setAuthMode('register')}/>}

                </Box>

            </div>
        </div>
    )
}

interface AuthProps{
    onClick?: ()=>void
}

export const Registration: FC<AuthProps> = ({onClick}) => {

    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }, mode: 'onChange'
    });



    const onSubmit = async (values: any) => {
        const data = await dispatch(fetchRegister(values));

        if (!data.payload) {
            return alert('не удалось зарегистироваться')
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        } else {
            alert('не удалось зарегистрироваться');
        }
    }
    
    return (
        <>
            <Typography variant="h5">РЕГИСТРАЦИЯ</Typography>
            <Box padding={'12px'}>
                <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <TextField sx={{ width: '60%', margin: '10px' }} variant="filled" label='укажите почту'
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                        {...register('email', { required: 'укажите почту' })}></TextField>
                    <TextField sx={{ width: '60%', margin: '10px' }} variant="filled" label='укажите ник'
                        error={Boolean(errors.name?.message)}
                        helperText={errors.name?.message}
                        {...register('name', { required: 'укажите ник' })}></TextField>
                    <TextField sx={{ width: '60%', margin: '10px' }} variant="filled" type="password" autoComplete="current-password" label='укажите пароль' error={Boolean(errors.password?.message)}
                        helperText={errors.password?.message}
                        {...register('password', { required: 'укажите пароль' })} />
                    <Button size="large" disabled={!isValid} type="submit" variant="contained">зарегистрироваться</Button>
                </form>

            </Box>

            <hr style={{ borderTop: '2px solid black', width: '80%' }}></hr>
            <p>уже есть аккаунт?</p>
            <Button size="small" onClick={onClick}>войти</Button>
        </>
    )
}


export const Login: FC<AuthProps> = ({onClick}) => {

    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            email: '',
            password: '',
        }, mode: 'onChange'
    });



    const onSubmit = async (values: any) => {
        const data = await dispatch(fetchAuth(values));

        if (!data.payload) {
            return alert('не удалось зарегистироваться')
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        } else {
            alert('не удалось зарегистрироваться');
        }
    }
    
    return (
        <>
            <Typography variant="h5">ВХОД</Typography>
            <Box  padding={'12px'}>
                <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <TextField sx={{ width: '60%', margin: '10px' }} variant="filled" label='укажите почту'
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                        {...register('email', { required: 'укажите почту' })}></TextField>
                    <TextField sx={{ width: '60%', margin: '10px' }} variant="filled" type="password" autoComplete="current-password" label='укажите пароль' error={Boolean(errors.password?.message)}
                        helperText={errors.password?.message}
                        {...register('password', { required: 'укажите пароль' })} />
                    <Button size="large" disabled={!isValid} type="submit" variant="contained">войти</Button>
                </form>

            </Box>

            <hr style={{ borderTop: '2px solid black', width: '80%' }}></hr>
            <p>нет аккаунта?</p>
            <Button size="small" onClick={onClick}>создать аккаунт</Button>
        </>
    )
}