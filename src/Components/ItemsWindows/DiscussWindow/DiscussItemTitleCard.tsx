import { Avatar, Box, Typography } from "@mui/material"
import { FC } from "react"
import { Link } from "react-router-dom"

interface DiscussItemTitleCardProps {
    author: string,
    nick: string,
    title: string,
    avatar: string
}

export const DiscussItemTitleCard: FC<DiscussItemTitleCardProps> = ({ author, title, nick, avatar }) => {
    return (

        <div className="discussItemTitle">
            
            <div className="discussItemTitle__user" >
                <Typography variant="h6">автор:</Typography>
                <Link to={`/profile/${nick}`}>
                    <div className="discussItemTitle__user-profile">
                        <Avatar src={`http://localhost:4444${avatar}`} sx={{ width: '80px', height: '80px' }}></Avatar>
                        <Typography variant="h5">{author}</Typography>
                    </div>
                </Link>
            </div>
            <hr style={{ borderLeft: '4px solid black', height: 'auto' }}></hr>
            <Typography variant="h2">{title}</Typography>
        </div>

    )
}