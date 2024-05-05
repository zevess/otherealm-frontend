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
        <div className="comment">

            <div className="commentUser">
                <Link to={`/profile/${nick}`}>
                    <div className="commentUser__info">

                        <Avatar className="commentUser__info-avatar" src={`http://localhost:4444${avatar}`}></Avatar>
                        <p className="commentUser__info-nick">{name}</p>
                    
                    </div>
                        
                    
                </Link>


                <hr style={{ borderLeft: '4px solid black', height: 'auto' }}></hr>
            </div>


            <Typography variant="h5" sx={{ textAlign: 'start', paddingTop: '10px', paddingBottom: '10px' }} className="commentText">{text}</Typography>
        </div>


    )
}