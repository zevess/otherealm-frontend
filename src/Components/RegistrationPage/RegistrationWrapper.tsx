// import { Box, Button, TextField, Typography } from "@mui/material"
// import { About } from "./About"
// import { HeaderLogin } from "./HeaderLogin"
// import { Welcome } from "./Welcome"
// import { fetchRegister, selectIsAuth } from "../../store/auth"
// import { useAppDispatch } from "../../store/hooks"
// import { useForm } from "react-hook-form"
// import { Navigate } from "react-router-dom"
// import { useAppSelector } from "../../store"


// export const RegistrationWrapper = () => {

//     const isAuth = useAppSelector((state) => state.authData.data);
//     const dispatch = useAppDispatch();

//     const {register, handleSubmit, formState: {errors, isValid}} = useForm({
//         defaultValues:{
//             name: '',
//             email: '',
//             password: '',
//         }, mode: 'onChange'
//     });
    


//     const onSubmit = async(values: any) => {
//         const data = await dispatch(fetchRegister(values));

//         if(!data.payload){
//             return alert('не удалось зарегистироваться')
//         }
//         if('token' in data.payload){
//             window.localStorage.setItem('token', data.payload.token);
//         } else{
//             alert('не удалось зарегистрироваться');
//         }
//     }

//     console.log(isAuth);

//     if(isAuth){
//         return <Navigate to={'/'}/>
//     }

//     return (
//         <div className="registrationWrapper">
//             <HeaderLogin />
//             <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
//                 <Box width={'50%'} bgcolor={'white'} borderRadius={'6px'} border={'solid 2px #9095f7'} padding={'12px'}>
//                     {/* <Typography variant="h2">OTHEREALM</Typography>
//                     <hr style={{ borderTop: '2px solid black', width: '80%' }}></hr> */}
//                     <Typography variant="h5">РЕГИСТРАЦИЯ</Typography>
//                     <Box display={'flex'} flexDirection={'column'} alignItems={'center'} padding={'12px'}>
//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <TextField sx={{ width: '60%', margin: '10px' }} variant="filled" label='укажите почту'
//                             error={Boolean(errors.email?.message)}
//                             helperText={errors.email?.message}
//                             {...register('email', {required: 'укажите почту'})}></TextField>
//                             <TextField sx={{ width: '60%', margin: '10px' }} variant="filled" label='укажите ник'
//                             error={Boolean(errors.name?.message)}
//                             helperText={errors.name?.message}
//                             {...register('name', {required: 'укажите ник'})}></TextField>
//                             <TextField sx={{ width: '60%', margin: '10px' }} variant="filled" type="password" autoComplete="current-password" label='укажите пароль'error={Boolean(errors.password?.message)}
//                             helperText={errors.password?.message}
//                             {...register('password', {required: 'укажите пароль'})} />
//                             <Button disabled={!isValid} type="submit" variant="contained">зарегистрироваться</Button>
//                         </form>

//                     </Box>

//                 </Box>

//                 {/* <Welcome /> */}
//                 {/* <About /> */}
//             </div>
//         </div>
//     )
// }

