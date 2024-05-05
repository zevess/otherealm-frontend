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

            <div className="commentUser">
                <Link to={`/profile/${nick}`}>
                    <div className="commentUser__info">
                        <Avatar className="commentUser__info-avatar" src={`http://localhost:4444${avatar}`}></Avatar>
                        <Typography variant="h5" className="commentUser__info-nick">{author}</Typography>
                    </div>
                </Link>


                <hr style={{ borderLeft: '4px solid black', height: 'auto' }}></hr>
            </div>
            <Typography variant="h4" className="discussTitle" >{title}</Typography>
        </div>

    )
}