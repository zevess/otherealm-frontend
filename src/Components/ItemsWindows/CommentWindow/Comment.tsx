import { Avatar, Box, Typography } from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import { FC } from "react"
import { Link } from "react-router-dom"

interface CommentProps {
    name: string,
    nick: string
    text: string
}

export const Comment: FC<CommentProps> = ({ name, text, nick }) => {
    return (
        <Box width={'auto'} bgcolor={'white'} display={'flex'} borderRadius={'30px'} border={'solid 3px black'} padding={'10px'} marginBottom={'30px'} >
            <Box display={'flex'} justifyContent={'center'} marginRight={'10px'}>
                <Link to={`/profile/${nick}`}>
                    <Box margin={'20px'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                        <Avatar sx={{ bgcolor: deepOrange, width: '80px', height: '80px' }}></Avatar>
                        <Typography variant="h5">{name}</Typography>
                    </Box>
                </Link>


                <hr style={{ borderLeft: '4px solid black', height: 'auto' }}></hr>
            </Box>
            <Typography variant="h5" sx={{ textAlign: 'center', paddingTop: '10px', paddingBottom: '10px' }}>{text}</Typography>
        </Box>
    )
}