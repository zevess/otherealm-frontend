import { Box, Typography } from "@mui/material"
import { DiscussItemTitleCard } from "./DiscussItemTitleCard"
import { Comment } from "../CommentWindow/Comment"
import React from "react"
import { InputText } from "../../InputText"
import axios from '../../../axios'
import { useAppDispatch } from "../../../store/hooks"
import { addDiscuss, clearDiscuss } from "../../../store/discuss"
import { useAppSelector } from "../../../store"
import { CommentSection } from "../CommentWindow/CommentSection"

export const discussInputStyles = {
    backgroundColor: 'white', textAlign: 'left', marginBottom: '20px', width: '100%'
}


export const ItemDiscussWindow = () =>{

    const dispatch = useAppDispatch()
    const discussData = useAppSelector((state) => state.discussData.discuss.items);
    const [commentText, setCommentText] = React.useState('')

    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    
    const itemId = parts[parts.length -2];
    const discussId = parts[parts.length - 1];

    console.log(discussId)

    React.useEffect(() => {
        axios.get(`/discuss/${itemId}/${discussId}`).then(res => {
            dispatch(addDiscuss(res.data));
        })

        return () =>{
            dispatch(clearDiscuss())
        }
    }, [])


    return(
        <Box height={'auto'} width={'75%'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} marginLeft={'auto'} marginRight={'auto'}>
            <DiscussItemTitleCard title={discussData.title} author={discussData.user?.name}/>
            <hr style={{ borderTop: '6px solid black', width: '90%', marginTop: '50px', marginBottom: '50px' }}></hr>
            <Typography sx={{marginBottom: '200px'}} variant="h4">{discussData.text}</Typography>
            <CommentSection postId={discussId}/>
            {/* <InputText text={commentText} setText={setCommentText} onClick={()=>alert(commentText)} placeholder="ответить" sx={discussInputStyles}/> */}
            {/* <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/> */}
        </Box>        
    )
}