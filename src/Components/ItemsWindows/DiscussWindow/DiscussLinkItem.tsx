import { Box, Typography } from "@mui/material"
import { FC } from "react"
import { Link, useParams } from "react-router-dom"

interface DiscussLinkItemProps{
    author: string,
    title: string,
    param?: string,
    linkTo: string
}

export const DiscussLinkItem: FC<DiscussLinkItemProps> = ({title, author, linkTo}) => {

    const params = useParams();
    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const itemId = String(parts.slice(-2).join(''))
    console.log(currentUrl)

    return (
        <Link to={`/discuss/${itemId}/${linkTo}`}>
            <Box maxWidth={'100%'} bgcolor={'white'} minHeight={'140px'} border={'solid 3px black'} borderRadius={'30px'} padding={'20px'} margin={'20px'}>
                <Typography variant="h6" textAlign={'left'}>автор: {author}</Typography>
                <Typography variant="h2">{title}</Typography>
            </Box>
        </Link>
    )
}
