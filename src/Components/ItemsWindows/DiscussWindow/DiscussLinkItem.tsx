import { Box, Typography } from "@mui/material"
import { FC } from "react"
import { Link } from "react-router-dom"

interface DiscussLinkItemProps{
    author: string,
    title: string,
    param?: string,
    linkTo: string
}

export const DiscussLinkItem: FC<DiscussLinkItemProps> = ({title, author, linkTo}) => {
    return (
        <Link to={`/discuss/${linkTo}`}>
            <Box maxWidth={'100%'} bgcolor={'white'} minHeight={'140px'} border={'solid 3px black'} borderRadius={'30px'} padding={'20px'} margin={'20px'}>
                <Typography variant="h6" textAlign={'left'}>автор: {author}</Typography>
                <Typography variant="h2">{title}</Typography>
            </Box>
        </Link>
    )
}