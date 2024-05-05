import { Box } from "@mui/material"
import { InputText } from "../../InputText"
import { Comment } from "./Comment"
import React, { FC } from "react"
import { useParams } from "react-router-dom"
import axios from '../../../axios'
import { useAppDispatch } from "../../../store/hooks.tsx"
import { addComments } from "../../../store/comment.ts"
import { CommentProps } from "../../../store/interfaces.tsx"

export const commentInputStyles = {
    backgroundColor: 'white', textAlign: 'left', marginBottom: '20px', width: '100%'
}

interface CommentSectionProps{
    postId: string
}

export const CommentSection:FC<CommentSectionProps> = ({postId}) => {

    const dispatch = useAppDispatch();
    const [text, setCommentText] = React.useState('');
    const [data, setData] = React.useState<CommentProps[]>()

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
            dispatch(addComments(res.data));
            setData(res.data);
        })
    }, [])

    return (
        <Box display={'flex'} flexDirection={'column'}>
            <InputText text={text} setText={setCommentText} onClick={onSubmit} placeholder={"комментарий (не менее 3 символов)"} />
            <Box>
                {data !== undefined && data.map((item) => (
                    <Comment key={item._id} avatar={item?.user.avatarUrl} name={item?.user.name} nick={item?.user.nick} text={item.text} />
                ))}
            </Box>
            
        </Box>
    )
}