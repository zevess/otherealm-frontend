import { Box, Typography } from "@mui/material"
import { Header } from "../Header"
import { Link } from "react-router-dom"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export const HeaderLogin = () => {
    return (
        <Header>
            <Link to={"/search"}>
                <Box display={'flex'} alignItems={'center'}>
                    <SearchOutlinedIcon />
                    поиск
                </Box>
            </Link>
            <Box component={'img'} sx={{ width: '150px' }} src="/src/assets/img/ЛОГО.svg"></Box>
            <Link to={"/profile"}>
                <Box display={'flex'} alignItems={'center'}>
                    <PersonOutlineOutlinedIcon />
                    <p>профиль</p>
                </Box>

            </Link>

        </Header>
    )
}