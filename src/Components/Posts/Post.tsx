import { Avatar, Box, IconButton, Typography } from "@mui/material"
import ReactMarkdown from 'react-markdown'
import { Link } from "react-router-dom"
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { FC } from "react";
import { useAppSelector } from "../../store";


interface PostProps {
    user: string,
    id: string,
    date: string,
    title: string,
    imageUrl: string,
    avatar: string,
    isText: string,
}

export const Post: FC<PostProps> = ({ user, date, title, imageUrl, id, avatar, isText }) => {

    const userId = (useAppSelector((state) => state.authData.data?._id));
    const selectedUserId = (useAppSelector((state) => state.authData.selectedUserData?._id));
    const isNotSameUser = (userId == selectedUserId)



    return (
        <div className="postItem">

            <div className="postItemDetails">
                <div className="postItemDetails-user">
                    <Avatar src={`http://localhost:4444${avatar}`} sx={{ width: '80px', height: '80px', marginRight: '10px' }} />
                    <div className="postItemDetails-user__info">
                        <Typography variant="h5">{user}</Typography>
                        <Typography variant="subtitle2">{date}</Typography>
                    </div>

                    {isNotSameUser && <Box marginLeft={'auto'}>
                        <Link to={`/post/${id}/edit`}>
                            <IconButton >
                                <EditOutlinedIcon />
                            </IconButton>
                        </Link>

                    </Box>}
                </div>
                <hr className="hrHorizontal"></hr>
            </div>
            
            <Link to={`/post/${id}`}>
                {imageUrl && <img className='postItemImg' src={`http://localhost:4444${imageUrl}`} ></img>}
                <p style={{ fontSize: '30px' }}>{title}</p>
                {isText && <p>...</p>}

                <div className="postItemAlso">
                    <IconButton>
                        <ChatBubbleOutlineIcon sx={{ color: '#747bff' }} />
                    </IconButton>

                </div>

            </Link>

        </div>
    )
}