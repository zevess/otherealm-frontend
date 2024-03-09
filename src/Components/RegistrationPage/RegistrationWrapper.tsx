import { Box, Button, TextField, Typography } from "@mui/material"
import { About } from "./About"
import { HeaderLogin } from "./HeaderLogin"
import { Welcome } from "./Welcome"


export const RegistrationWrapper = () => {
    return (
        <div className="registrationWrapper">
            <HeaderLogin />
            <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                <Box width={'50%'} bgcolor={'white'} borderRadius={'12px'} border={'solid 2px #9095f7'}>
                    <Typography variant="h2">OTHEREALM</Typography>
                    <hr style={{ borderTop: '2px solid black', width: '80%' }}></hr>
                    <Typography variant="h5">регистрация</Typography>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} padding={'12px'}>
                        <TextField sx={{width: '60%', margin: '10px'}} variant="filled" label='укажите почту'></TextField>
                        <TextField sx={{width: '60%', margin: '10px'}} variant="filled" label='укажите ник'></TextField>
                        <TextField sx={{width: '60%', margin: '10px'}} variant="filled" type="password" autoComplete="current-password" label='укажите пароль'/>
                        <Button variant="contained">зарегистрироваться</Button>
                    </Box>

                </Box>

                {/* <Welcome /> */}
                {/* <About /> */}
            </div>
        </div>
    )
}

