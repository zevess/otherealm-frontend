import { Box, Typography } from "@mui/material"
import { FC } from "react"

interface DiscussItemTitleCardProps{
    author: string,
    title: string,
}

export const DiscussItemTitleCard:FC<DiscussItemTitleCardProps> = ({author, title}) => {
    return (

        <Box maxWidth={'100%'} bgcolor={'white'} minHeight={'140px'} border={'solid 3px black'} borderRadius={'30px'} padding={'20px'} margin={'20px'}>
            <Typography variant="h6" textAlign={'left'}>автор: {author}</Typography>
            <Typography variant="h2">{title}</Typography>
        </Box>

    )
}