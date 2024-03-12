import { Avatar, Box, Typography } from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import { FC } from "react"

interface CommentProps{
    name: string,
    text: string
}

export const Comment:FC<CommentProps> = ({name, text}) => {
    return (
        <Box width={'auto'} bgcolor={'white'} display={'flex'} borderRadius={'30px'} border={'solid 3px black'} padding={'10px'} marginBottom={'30px'} >
            <Box display={'flex'} justifyContent={'center'} marginRight={'10px'}>
                <Box margin={'20px'}>
                    <Avatar sx={{ bgcolor: deepOrange, width: '80px', height: '80px' }}></Avatar>
                    <Typography variant="h5">{name}</Typography>
                </Box>

                <hr style={{ borderLeft: '4px solid black', height: 'auto' }}></hr>
            </Box>
            <Typography variant="h5" sx={{ textAlign: 'center', paddingTop: '10px', paddingBottom: '10px' }}>{text}</Typography>
        </Box>
    )
}