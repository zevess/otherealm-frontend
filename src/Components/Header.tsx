import { Box, Drawer, IconButton, List, ListItem, ListItemButton, Typography } from "@mui/material"
import { HeaderTemplate } from "./HeaderTemplate"
import { Link } from "react-router-dom"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useAppDispatch } from "../store/hooks";
import { useSelector } from "react-redux";
import { logout, } from "../store/auth";
import { useAppSelector } from "../store";
import LogoutIcon from '@mui/icons-material/Logout';
import DehazeOutlinedIcon from '@mui/icons-material/DehazeOutlined';
import React from "react";

export const Header = () => {

    const dispatch = useAppDispatch();

    const isAuth = useAppSelector((state) => state.authData.data);
    const userNick = useAppSelector((state) => state.authData.data?.nick);
    const onClickLogout = () => {
        if (window.confirm('вы уверены что хотите выйти?')) {
            dispatch(logout())
            window.localStorage.removeItem('token')
        }
    };

    const [drawer, setDrawer] = React.useState(false);
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        window.addEventListener('resize', () => setWindowWidth(window.innerWidth))
        return () => {
            window.removeEventListener('resize', () => setWindowWidth(window.innerWidth))
        }
    }, [])

    const DrawerList = (
        <Box role='presentation' onClick={() => setDrawer(false)}>
            <List className="drawerStyles">
                <ListItem>
                    <ListItemButton>
                        <Link to={"/search"} style={{ width: '100%', height: '100%' }}>
                            <Box display={'flex'} alignItems={'center'}>
                                <SearchOutlinedIcon />
                                поиск
                            </Box>
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <Link to={`/profile/${userNick}`}>
                            <Box display={'flex'} alignItems={'center'}>
                                <PersonOutlineOutlinedIcon />
                                <p>профиль</p>
                            </Box>
                        </Link>
                    </ListItemButton>

                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <IconButton onClick={onClickLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </ListItemButton>

                </ListItem>

            </List>
        </Box>
    )

    return (
        <HeaderTemplate>
            {isAuth ? (
                <div className="headerNav">
                    <Link to={'/'}>
                        <Box component={'img'} sx={{ width: '150px' }} src="/src/assets/img/ЛОГО.svg"></Box>
                    </Link>

                    {windowWidth > 768 && <>
                        <Link to={"/search"}>
                            <Box display={'flex'} alignItems={'center'}>
                                <SearchOutlinedIcon />
                                поиск
                            </Box>
                        </Link>
                        <Link to={`/profile/${userNick}`}>
                            <Box display={'flex'} alignItems={'center'}>
                                <PersonOutlineOutlinedIcon />
                                <p>профиль</p>
                            </Box>
                        </Link>
                        <IconButton onClick={onClickLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </>}
                    {windowWidth <= 768 && (
                        <IconButton onClick={() => setDrawer(true)}>
                            <DehazeOutlinedIcon />
                        </IconButton>
                    )}

                    <Drawer open={drawer} onClose={() => setDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                </div>
            ) : (
                <div className="headerNav">
                    <Link to={'/'}>
                        <Box component={'img'} sx={{ width: '150px' }} src="/src/assets/img/ЛОГО.svg"></Box>
                    </Link>
                    <Link to={'/auth'}>
                        <p>войти</p>
                    </Link>
                </div>

            )}


        </HeaderTemplate>
    )
}