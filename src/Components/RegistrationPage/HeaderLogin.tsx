import { Box, IconButton, Typography } from "@mui/material"
import { Header } from "../Header"
import { Link } from "react-router-dom"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useAppDispatch } from "../../store/hooks";
import { useSelector } from "react-redux";
import { logout, } from "../../store/auth";
import { useAppSelector } from "../../store";
import LogoutIcon from '@mui/icons-material/Logout';

export const HeaderLogin = () => {

    const dispatch = useAppDispatch();

    const isAuth = useAppSelector((state) => state.authData.data);

    const onClickLogout = () => {
        if (window.confirm('вы уверены что хотите выйти?')) {
            dispatch(logout())
            window.localStorage.removeItem('token')
        }
    };

    // console.log(isAuth)

    return (
        <Header>
            <Box component={'img'} sx={{ width: '150px' }} src="/src/assets/img/ЛОГО.svg"></Box>


            {isAuth ? (
                <>
                    <Link to={"/search"}>
                        <Box display={'flex'} alignItems={'center'}>
                            <SearchOutlinedIcon />
                            поиск
                        </Box>
                    </Link>
                    <Link to={"/profile"}>
                        <Box display={'flex'} alignItems={'center'}>
                            <PersonOutlineOutlinedIcon />
                            <p>профиль</p>
                        </Box>
                    </Link>
                    <IconButton onClick={onClickLogout}>
                        <LogoutIcon/>
                    </IconButton>
                </>
            ) : (
                <>
                    <Link to={'/auth'}>
                        <p>войти</p>
                    </Link>
                </>

            )}


        </Header>
    )
}