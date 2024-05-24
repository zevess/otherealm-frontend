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
import { fetchOnePost } from "../../store/posts";
import { clearComments } from "../../store/comment";

export const FullPost = () => {

    const dispatch = useAppDispatch();

    // const [post, setPost] = React.useState<postProps | null>(null);

    const postSelector = useAppSelector(state => state.postsData.currentPost)

    const params = useParams();
    const postId = params.postId;
    

    const userId = (useAppSelector((state) => state.authData.data?._id));
    const isSameUser = (userId === postSelector.post?.user._id)

    React.useEffect(() => {
        if (postId !== undefined) {
            dispatch(clearComments())
            dispatch(fetchOnePost(`${postId}`));
            
            // axios.get(`/post/${postId}`).then(res => {
            //     setPost(res.data);
                
            // })
        }
    }, [postId])

    const dateToForm = postSelector.post ? new Date(postSelector.post.createdAt) : null;
    const options = {
        weekdays: 'short' as const,
        year: 'numeric' as const,
        month: 'short' as const,
        day: 'numeric' as const
    }

    const formatedDate = dateToForm ? dateToForm.toLocaleString('ru-RU', options) : null

    const time = dateToForm ? dateToForm.toTimeString().slice(0, 8) : null;

    if (postSelector.post) return (
        <div className="fullPostWrapper">
            <div className="fullPost">
                <div className="fullPostTop">

                    <div className="postItemDetails-user">
                        <Link to={`/profile/${postSelector.post.user.nick}`} style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Avatar src={`http://localhost:4444${postSelector.post.user.avatarUrl}`} className="postItemDetails-user__avatar" />
                            <div className="postItemDetails-user__info">
                                <p className="postUserInfo nick">{postSelector.post.user.name}</p>
                                <Divider sx={{ width: '100%' }} />
                                <p className="postUserInfo date">{formatedDate + '; ' + time}</p>

                            </div>
                        </Link>

                        <Box marginLeft={'auto'} display={'flex'}>
                            <VisibilityOutlinedIcon sx={{ paddingRight: '10px' }} />
                            <p style={{ margin: 0 }}>{postSelector.post.viewsCount}</p>
                        </Box>


                        {isSameUser && <Box marginLeft={'auto'}>
                            <Link to={`/post/${postSelector.post._id}/edit`}>
                                <IconButton >
                                    <EditOutlinedIcon />
                                </IconButton>
                            </Link>

                        </Box>}

                    </div>

                    <hr className="hrHorizontal"></hr>
                </div>

                {postSelector.post.imageUrl &&
                    <img src={`http://localhost:4444${postSelector.post.imageUrl}`} className="fullPostImg"></img>
                }

                <Typography variant="h4" className="fullPostTitle">{postSelector.post.title}</Typography>
                <Divider sx={{width: '60%', margin: '0 auto'}}/>
                <ReactMarkdown children={postSelector.post.text} />
                {postId !== undefined && <CommentSection postId={postId} />}
            </div>
        </div>
    )
}