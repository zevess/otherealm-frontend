import { Box } from "@mui/material"
import { InputText } from "../../InputText"
import { Comment } from "./Comment"
import React from "react"
import { useParams } from "react-router-dom"
import axios from '../../../axios'
import { useAppDispatch } from "../../../store/hooks.tsx"
import { fetchGetComments } from "../../../store/comment.ts"

export const commentInputStyles = {
    backgroundColor: 'white', textAlign: 'left', marginBottom: '20px', width: '100%'
}

export const CommentSection = () => {

    const [text, setCommentText] = React.useState('');
    const [data, setData] = React.useState()

    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const postId = String(parts.slice(-2).join(''))
    console.log(postId);

    const onSubmit = async () => {
        try {
            const fields = {
                text,
                postId
            }
    
            await axios.post('/comments', fields);
            setCommentText('');
            axios.get(`/comments/${postId}`).then(res => {
                setData(res.data);
                
            })
        } catch (err) {
            console.warn(err);
            alert("ошибка при добавлении комментария")
        }
    }


    React.useEffect(() => {
        axios.get(`/comments/${postId}`).then(res => {
            setData(res.data);
        })
    }, [])

    return (
        <Box display={'flex'} flexDirection={'column'}>
            <InputText text={text} setText={setCommentText} onClick={onSubmit} placeholder={"комментарий"} sx={commentInputStyles} />
            <Box>
                {data !== undefined && data.map((item: any) => (
                    <Comment name={item.user.name} nick={item.user.nick} text={item.text} />
                ))}
            </Box>
        </Box>
    )
}