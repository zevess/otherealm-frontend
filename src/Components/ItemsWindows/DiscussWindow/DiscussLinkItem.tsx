import { Box, Divider, Typography } from "@mui/material"
import { FC } from "react"
import { Link, useParams } from "react-router-dom"

interface DiscussLinkItemProps{
    author: string,
    title: string,
    param?: string,
    linkTo: string,
    avatar?: string
}

export const DiscussLinkItem: FC<DiscussLinkItemProps> = ({title, author, linkTo}) => {

    const params = useParams();
    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const itemId = String(parts.slice(-2).join(''))
    console.log(currentUrl)

    return (
        <Link to={`/discuss/${itemId}/${linkTo}`}>
            <div className="discussLink">
                <Typography variant="h6" textAlign={'left'}>автор: {author}</Typography>
                <Divider/>
                <p className="discussLinkTitle">{title}</p>
            </div>
        </Link>
    )
}
