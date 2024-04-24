import { Avatar, Box, IconButton, Typography } from "@mui/material"
import ReactMarkdown from 'react-markdown'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { CommentSection } from "../ItemsWindows/CommentWindow/CommentSection";
import { useAppDispatch } from "../../store/hooks";
import React from "react";
import axios from '../../axios'
import { useParams } from "react-router-dom";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export const FullPost = () => {

    const [post, setPost] = React.useState('');
    const params = useParams();
    const postId = params.postId;
    
    React.useEffect(() => {
        if (postId !== undefined) {
            axios.get(`/post/${postId}`).then(res => {
                setPost(res.data);
            })
        }
    }, [])
    
    if (post) return (
        <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Box width={'70%'} maxWidth={'1200px'} minHeight={'150px'} bgcolor={'white'} border={'solid 1px black'} borderRadius={'24px'} marginTop={'40px'} padding={'12px'}>
                <Box width={'90%'} display={'flex'} flexDirection={'column'} marginX={'auto'}>
                    <Box display={'flex'} alignItems={'flex-end'} padding={'10px'}>
                        <Avatar src={`http://localhost:4444${post.user.avatarUrl}`} sx={{ width: '80px', height: '80px', marginRight: '10px' }} />
                        <Box>
                            <Typography variant="h5">{post?.user.name}</Typography>
                            <Typography variant="subtitle2">{post?.createdAt}</Typography>
                        </Box>
                    </Box>
                    <hr style={{ borderTop: '1px solid black', width: '100%', margin: '0 auto' }}></hr>
                </Box>
                
                {post?.imageUrl && 
                <Box component={'img'} src={`http://localhost:4444${post?.imageUrl}`} marginTop={'15px'} marginBottom={'15px'} width={'80%'} maxWidth={'800px'} borderRadius={'16px'} sx={{ objectFit: 'contain' }}>  
                </Box>}
                
                <Typography padding={'70px'} variant="h2">{post?.title}</Typography>
                <ReactMarkdown children={post?.text} />
                {postId !== undefined && <CommentSection postId={postId} />}
            </Box>
        </Box>
    )
}