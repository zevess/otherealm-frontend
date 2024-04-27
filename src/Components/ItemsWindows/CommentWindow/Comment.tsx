import { Avatar, Box, Typography } from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import { FC } from "react"
import { Link } from "react-router-dom"

interface CommentProps {
    name: string,
    nick: string
    text: string
    avatar: string
}

export const Comment: FC<CommentProps> = ({ name, text, nick, avatar }) => {
    return (
        <div className="commentSectionComment">

            <div className="commentSectionComment__user">
                <Link to={`/profile/${nick}`}>
                    <div className="commentSectionComment__user-info">
                        <Avatar className="commentAvatar" src={`http://localhost:4444${avatar}`}></Avatar>
                        <Typography variant="h5" className="commentUserNick">{name}</Typography>
                    </div>
                        
                    
                </Link>


                <hr style={{ borderLeft: '4px solid black', height: 'auto' }}></hr>
            </div>


            <Typography variant="h5" sx={{ textAlign: 'center', paddingTop: '10px', paddingBottom: '10px' }}>{text}</Typography>
        </div>


    )
}