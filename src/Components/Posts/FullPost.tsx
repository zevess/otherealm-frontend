import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material"
import ReactMarkdown from 'react-markdown'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { CommentSection } from "../ItemsWindows/CommentWindow/CommentSection";
import { useAppDispatch } from "../../store/hooks";
import React from "react";
import axios from '../../axios'
import { Link, useParams } from "react-router-dom";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useAppSelector } from "../../store";
import { postProps } from "../../store/interfaces";

export const FullPost = () => {

    const [post, setPost] = React.useState<postProps | null>(null);

    const params = useParams();
    const postId = params.postId;
    console.log(post)

    const userId = (useAppSelector((state) => state.authData.data?._id));
    const isSameUser = (userId === post?.user?._id)

    React.useEffect(() => {
        if (postId !== undefined) {
            axios.get(`/post/${postId}`).then(res => {
                setPost(res.data);
                
            })
        }
    }, [])

    const dateToForm = post ? new Date(post?.createdAt) : null;
    const options = {
        weekdays: 'short' as const,
        year: 'numeric' as const,
        month: 'short' as const,
        day: 'numeric' as const
    }

    const formatedDate = dateToForm ? dateToForm.toLocaleString('ru-RU', options) : null

    const time = dateToForm ? dateToForm.toTimeString().slice(0, 8) : null;

    if (post) return (
        <div className="fullPostWrapper">
            <div className="fullPost">
                <div className="fullPostTop">

                    <div className="postItemDetails-user">
                        <Link to={`/profile/${post?.user.nick}`} style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Avatar src={`http://localhost:4444${post.user.avatarUrl}`} className="postItemDetails-user__avatar" />
                            <div className="postItemDetails-user__info">
                                <p className="postUserInfo nick">{post?.user.name}</p>
                                <Divider sx={{ width: '100%' }} />
                                <p className="postUserInfo date">{formatedDate + '; ' + time}</p>

                            </div>
                        </Link>

                        <Box marginLeft={'auto'} display={'flex'}>
                            <VisibilityOutlinedIcon sx={{ paddingRight: '10px' }} />
                            <p style={{ margin: 0 }}>{post?.viewsCount}</p>
                        </Box>


                        {isSameUser && <Box marginLeft={'auto'}>
                            <Link to={`/post/${post?._id}/edit`}>
                                <IconButton >
                                    <EditOutlinedIcon />
                                </IconButton>
                            </Link>

                        </Box>}

                    </div>

                    <hr className="hrHorizontal"></hr>
                </div>

                {post?.imageUrl &&
                    <img src={`http://localhost:4444${post?.imageUrl}`} className="fullPostImg"></img>
                }

                <Typography variant="h4" className="fullPostTitle">{post?.title}</Typography>
                <ReactMarkdown children={post?.text} />
                {postId !== undefined && <CommentSection postId={postId} />}
            </div>
        </div>
    )
}